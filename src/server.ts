import axios from 'axios'
import crypto from 'crypto'
import express from 'express'
import helmet from 'helmet'
import * as jose from 'jose'
import { Issuer, type Client, generators } from 'openid-client'
import logger from 'pino-http'

type AnyResponse = any

const adminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET
const domain = process.env.DOMAIN
const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction

const signingKey = process.env.JWT_SIGNING_SECRET
const useFirebase = process.env.NEXT_PUBLIC_USE_FIREBASE === 'true'

// OIDC configuration
const oidcIssuerUrl = process.env.OIDC_ISSUER_URL
const oidcClientId = process.env.OIDC_CLIENT_ID
const oidcClientSecret = process.env.OIDC_CLIENT_SECRET
const oidcRedirectUri =
  process.env.OIDC_REDIRECT_URI || `https://${domain}/auth/oidc/callback`
const oidcScopes = process.env.OIDC_SCOPES || 'openid profile email'
const oidcIdClaim = process.env.OIDC_ID_CLAIM || 'sub'
const oidcEnabled = Boolean(oidcIssuerUrl && oidcClientId)

if (!signingKey && !useFirebase) {
  throw Error('Your JWT_SIGNING_SECRET is invalid')
}
if (!adminSecret && !useFirebase) {
  throw Error('Your HASURA_GRAPHQL_ADMIN_SECRET is invalid')
}

const app = express()
app.use(express.json())
app.use(logger(isDevelopment ? { transport: { target: 'pino-pretty' } } : {}))
isProduction && app.use(helmet())

const port = 3001
const graphqlUrl = isProduction
  ? // We need server to server communication (over HTTP) here.
    // In other words, the authentication server container to Hasura container on production.
    // And the authentication server to Hasura container on development.
    // As the authentication server is not in a container on development.
    // If you have the authentication server go through Caddy to the Hasura server, it will strip the X-Hasura-Role
    // This is usually exactly what you want for security! However, for the /auth/graphql route
    // It is a problem, as stripping out X-Hasura-Role will have Hasura default to the admin role
    // Simply because you are also passing X-Hasura-Admin-Secret at the same time.
    // In this scenario, you would have the request made with admin permissions, effectively.
    'http://graphql-server:8080/v1/graphql'
  : 'http://localhost:8080/v1/graphql'

async function issueHasuraJWT(authId: string): Promise<string> {
  const customClaims = {
    'https://hasura.io/jwt/claims': {
      'x-hasura-allowed-roles': ['user'],
      'x-hasura-default-role': 'user',
      'x-hasura-role': 'user',
      'x-hasura-user-id': authId,
      'x-hasura-username': authId,
    },
  }
  const secret = new TextEncoder().encode(signingKey)
  return new jose.SignJWT(customClaims)
    .setProtectedHeader({ alg: 'HS256' })
    .setAudience(`urn:${domain}`)
    .setExpirationTime('30d')
    .sign(secret)
}

const getProfiles = async (token: string) => {
  const document = `
    query GET_PROFILES($token: uuid!) {
      profiles(where: {apiToken: {_eq: $token}}) {
        authId
        id
      }
    }`

  const response = await axios({
    url: graphqlUrl,
    method: 'post',
    headers: {
      'content-type': 'application/json',
      'X-Hasura-Admin-Secret': adminSecret || '',
    },
    data: {
      operationName: 'GET_PROFILES',
      query: document,
      variables: {
        token,
      },
    },
  })

  return (response?.data?.data?.profiles || []) as [
    { authId: string; id: string },
  ]
}

const getOrCreateProfile = async (authId: string): Promise<string> => {
  const query = `
    query GET_PROFILE_BY_AUTH_ID($authId: String!) {
      profiles(where: {authId: {_eq: $authId}}) {
        authId
      }
    }`

  const response = await axios({
    url: graphqlUrl,
    method: 'post',
    headers: {
      'content-type': 'application/json',
      'X-Hasura-Admin-Secret': adminSecret || '',
    },
    data: {
      operationName: 'GET_PROFILE_BY_AUTH_ID',
      query,
      variables: { authId },
    },
  })

  const profiles = response?.data?.data?.profiles || []
  if (profiles.length > 0) {
    return profiles[0].authId
  }

  const mutation = `
    mutation CREATE_PROFILE($authId: String!, $timezone: String!) {
      insert_profiles_one(
        object: { authId: $authId, timezone: $timezone }
        on_conflict: { constraint: profiles_authId_key, update_columns: [] }
      ) {
        authId
      }
    }`

  await axios({
    url: graphqlUrl,
    method: 'post',
    headers: {
      'content-type': 'application/json',
      'X-Hasura-Admin-Secret': adminSecret || '',
    },
    data: {
      operationName: 'CREATE_PROFILE',
      query: mutation,
      variables: { authId, timezone: 'UTC' },
    },
  })

  return authId
}

// OIDC state: lazy-initialized client and in-memory pending auth map
let oidcClient: Client | null = null

const OIDC_STATE_TTL_MS = 5 * 60 * 1000 // 5 minutes
const OIDC_MAX_PENDING = 1000 // cap to prevent memory exhaustion
const OIDC_CODE_TTL_MS = 60 * 1000 // 1 minute for code exchange

const pendingOidcAuth = new Map<
  string,
  { codeVerifier: string; nonce: string; createdAt: number }
>()

// Single-use authorization codes that map to JWTs (Finding #1 fix)
const pendingOidcCodes = new Map<
  string,
  { jwt: string; createdAt: number }
>()

function cleanupExpiredEntries() {
  const now = Date.now()
  for (const [key, entry] of pendingOidcAuth) {
    if (now - entry.createdAt > OIDC_STATE_TTL_MS) {
      pendingOidcAuth.delete(key)
    }
  }
  for (const [key, entry] of pendingOidcCodes) {
    if (now - entry.createdAt > OIDC_CODE_TTL_MS) {
      pendingOidcCodes.delete(key)
    }
  }
}

// Periodic cleanup every 60 seconds (Finding #5 fix)
setInterval(cleanupExpiredEntries, 60 * 1000)

async function getOidcClient(): Promise<Client> {
  if (oidcClient) return oidcClient
  if (!oidcIssuerUrl || !oidcClientId) {
    throw new Error('OIDC is not configured')
  }
  const issuer = await Issuer.discover(oidcIssuerUrl)
  oidcClient = new issuer.Client({
    client_id: oidcClientId,
    client_secret: oidcClientSecret || undefined,
    redirect_uris: [oidcRedirectUri],
    response_types: ['code'],
    token_endpoint_auth_method: oidcClientSecret
      ? 'client_secret_post'
      : 'none',
  })
  return oidcClient
}

app.get('/auth', (_req, res): AnyResponse => {
  return res.send('The server is healthy!')
})

app.post('/auth/login', async (req, res): Promise<AnyResponse> => {
  if (useFirebase) {
    console.log('This endpoint is disabled because Firebase is enabled.')
    return res.sendStatus(403)
  }
  const token = req?.body?.token
  if (!token) {
    console.log('This endpoint requires you to pass a token.')
    return res.sendStatus(422)
  }

  const profiles = await getProfiles(token)
  if (profiles.length === 1) {
    const authId = profiles[0].authId
    const JWT = await issueHasuraJWT(authId)
    return res.send(JWT)
  }
  console.log('No profile was found matching that token.')
  return res.sendStatus(403)
})

app.post('/auth/graphql', async (req, res): Promise<AnyResponse> => {
  const token = req?.body?.token
  const query = req?.body?.query
  if (!token) {
    return res.sendStatus(422)
  }
  if (!query) {
    return res.sendStatus(422)
  }
  const profiles = await getProfiles(token)
  if (profiles.length === 1) {
    const result = await axios({
      url: graphqlUrl,
      method: 'post',
      // If you include the X-Hasura-Admin-Secret header and also add the X-Hasura-Role and other user specific headers such as X-Hasura-User-Id,
      // Hasura GraphQL Engine will process the request using the defined access-control rules for that user and role and not as an admin.
      // https://hasura.io/docs/2.0/auth/authentication/admin-secret-access/
      headers: {
        'content-type': 'application/json',
        'X-Hasura-Admin-Secret': adminSecret || '',
        'X-Hasura-Role': 'user',
        'X-Hasura-User-Id': profiles[0].authId,
      },
      data: {
        query: req.body.query,
        variables: req.body.variables ? req.body.variables : {},
      },
    })
    return res.send(result.data.data)
  }
  console.log('No profile was found matching that token.')
  return res.sendStatus(403)
})

// OIDC routes
if (oidcEnabled) {
  app.get('/auth/oidc/login', async (_req, res): Promise<AnyResponse> => {
    try {
      cleanupExpiredEntries()

      // Reject if too many pending flows (Finding #5 fix)
      if (pendingOidcAuth.size >= OIDC_MAX_PENDING) {
        console.log('Too many pending OIDC authentication flows.')
        return res.sendStatus(503)
      }

      const client = await getOidcClient()
      const codeVerifier = generators.codeVerifier()
      const codeChallenge = generators.codeChallenge(codeVerifier)
      const state = crypto.randomBytes(32).toString('hex')
      const nonce = generators.nonce()

      pendingOidcAuth.set(state, {
        codeVerifier,
        nonce,
        createdAt: Date.now(),
      })

      const authorizationUrl = client.authorizationUrl({
        scope: oidcScopes,
        state,
        nonce,
        code_challenge: codeChallenge,
        code_challenge_method: 'S256',
      })

      return res.redirect(authorizationUrl)
    } catch (error) {
      console.log('OIDC login error:', error)
      return res.sendStatus(500)
    }
  })

  app.get('/auth/oidc/callback', async (req, res): Promise<AnyResponse> => {
    try {
      const client = await getOidcClient()
      const params = client.callbackParams(req)

      if (!params.state || !pendingOidcAuth.has(params.state)) {
        console.log('Invalid or expired OIDC state parameter.')
        return res.sendStatus(403)
      }

      const { codeVerifier, nonce } = pendingOidcAuth.get(params.state)!
      pendingOidcAuth.delete(params.state)

      // Validate nonce in the ID token (Finding #14 fix)
      const tokenSet = await client.callback(oidcRedirectUri, params, {
        state: params.state,
        code_verifier: codeVerifier,
        nonce,
      })

      const claims = tokenSet.claims()
      const userId = claims[oidcIdClaim]

      // Validate the claim value (Finding #6 fix)
      if (
        !userId ||
        typeof userId !== 'string' ||
        userId.length === 0 ||
        userId.length > 256
      ) {
        console.log(
          `OIDC ID token has invalid claim "${oidcIdClaim}": ${typeof userId}.`,
        )
        return res.sendStatus(403)
      }

      const authId = `oidc:${userId}`
      await getOrCreateProfile(authId)
      const jwt = await issueHasuraJWT(authId)

      // Issue a single-use authorization code instead of exposing the JWT in the URL (Finding #1 fix)
      const code = crypto.randomBytes(32).toString('hex')
      pendingOidcCodes.set(code, { jwt, createdAt: Date.now() })

      const redirectUrl = isProduction
        ? `https://${domain}/?code=${code}`
        : `http://localhost:3000/?code=${code}`

      return res.redirect(redirectUrl)
    } catch (error) {
      console.log('OIDC callback error:', error)
      return res.sendStatus(500)
    }
  })

  // Exchange a single-use authorization code for a JWT (Finding #1 fix)
  app.post('/auth/oidc/token', async (req, res): Promise<AnyResponse> => {
    const code = req?.body?.code
    if (!code || !pendingOidcCodes.has(code)) {
      return res.sendStatus(403)
    }

    const entry = pendingOidcCodes.get(code)!
    pendingOidcCodes.delete(code)

    // Reject if the code has expired
    if (Date.now() - entry.createdAt > OIDC_CODE_TTL_MS) {
      return res.sendStatus(403)
    }

    return res.json({ jwt: entry.jwt })
  })
}

app.use((err: any, _req: any, res: any, _next: any): AnyResponse => {
  return res.status(500).send(String(err))
})

app.listen(port, () => {
  console.log(`Authentication server listening on http://localhost:${port}`)
})
