import express from 'express'
import { gql, request } from 'graphql-request'
import helmet from 'helmet'
import * as jose from 'jose'

const signingKey = process.env['JWT_SIGNING_SECRET']
const adminSecret = process.env['HASURA_GRAPHQL_ADMIN_SECRET']
const useFirebase = process.env['NEXT_PUBLIC_USE_FIREBASE'] == 'true'
const domain = process.env['NEXT_PUBLIC_HASURA_DOMAIN']

const isProduction = process.env.NODE_ENV === 'production'

if (!signingKey && !useFirebase) {
  throw Error('Your JWT_SIGNING_SECRET is invalid')
}
if (!adminSecret && !useFirebase) {
  throw Error('Your HASURA_GRAPHQL_ADMIN_SECRET is invalid')
}

const app = express()
app.use(express.json())
isProduction && app.use(helmet())

const port = 3001
const graphqlUrl = isProduction
  ? `http://graphql-server:8080/v1/graphql`
  : `https://localhost/v1/graphql`

const getProfiles = async (token: string) => {
  const document = gql`
    query GET_PROFILES($token: String!, $apiToken: uuid!) {
      profiles(
        where: {
          _or: [{ authId: { _eq: $token } }, { apiToken: { _eq: $apiToken } }]
        }
      ) {
        authId
        id
      }
    }
  `
  const response: { profiles: [{ authId: string; id: string }] } =
    await request(
      graphqlUrl,
      document,
      {
        apiToken: token,
        token,
      },
      { 'X-Hasura-Admin-Secret': adminSecret || '' }
    )
  return response.profiles
}

app.get('/auth', (req, res) => {
  res.send('The server is healthy!')
})

app.post('/auth/login', async (req, res) => {
  if (useFirebase) {
    return res.sendStatus(403)
  }
  const token = req.body.token
  if (!req.body.token) {
    return res.sendStatus(422)
  }

  const profiles = await getProfiles(token)
  if (profiles.length === 1) {
    const customClaims = {
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['user'],
        'x-hasura-default-role': 'user',
        'x-hasura-role': 'user',
        'x-hasura-user-id': token,
        'x-hasura-username': token,
      },
    }
    const secret = new TextEncoder().encode(signingKey)
    const alg = 'HS256'
    const JWT = await new jose.SignJWT(customClaims)
      .setProtectedHeader({ alg })
      .setAudience(`urn:${domain}`)
      .setExpirationTime('30d')
      .sign(secret)
    return res.send(JWT)
  } else {
    return res.sendStatus(403)
  }
})

app.post('/auth/graphql', async (req, res) => {
  const token = req.body.token
  if (!req.body.token) {
    return res.sendStatus(422)
  }
  if (!req.body.query) {
    return res.sendStatus(422)
  }
  const profiles = await getProfiles(token)
  if (profiles.length === 1) {
    const result = await request(
      graphqlUrl,
      req.body.query,
      {},
      {
        'X-Hasura-Admin-Secret': adminSecret || '',
        'X-Hasura-Role': 'user',
        'X-Hasura-User-Id': profiles[0].authId,
      }
    )
    res.send(result)
  } else {
    return res.sendStatus(403)
  }
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, req: any, res: any, next: any) => {
  res.status(500).send(String(err))
})

app.listen(port, () => {
  console.log(`Authentication server listening on http://localhost:${port}`)
})
