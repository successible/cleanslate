import axios from 'axios'
import express from 'express'
import helmet from 'helmet'
import * as jose from 'jose'

const signingKey = process.env.JWT_SIGNING_SECRET
const adminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET
const useFirebase = process.env.NEXT_PUBLIC_USE_FIREBASE === 'true'
const domain = process.env.NEXT_PUBLIC_HASURA_DOMAIN

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
  ? 'http://graphql-server:8080/v1/graphql'
  : 'https://localhost/v1/graphql'

const getProfiles = async (token: string) => {
  const document = `
    query GET_PROFILES($token: uuid!) {
      profiles(
        where: {
          _or: [{ apiToken: { _eq: $token } }]
        }
      ) {
        authId
        id
      }
    }
  `
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
  return response.data.data.profiles as [{ authId: string; id: string }]
}

app.get('/auth', (req, res) => {
  res.send('The server is healthy!')
})

app.post('/auth/login', async (req, res) => {
  if (useFirebase) {
    console.log('This endpoint is disabled because Firebase is enabled.')
    return res.sendStatus(403)
  }
  const token = req.body.token
  if (!req.body.token) {
    console.log('This endpoint requires you to pass a token.')
    return res.sendStatus(422)
  }

  const profiles = await getProfiles(token)
  if (profiles.length === 1) {
    const authId = profiles[0].authId
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
    const alg = 'HS256'
    const JWT = await new jose.SignJWT(customClaims)
      .setProtectedHeader({ alg })
      .setAudience(`urn:${domain}`)
      .setExpirationTime('30d')
      .sign(secret)
    return res.send(JWT)
  }
  console.log('No profile was found matching that token.')
  return res.sendStatus(403)
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
    const result = await axios({
      url: graphqlUrl,
      method: 'post',
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
    res.send(result.data.data)
  } else {
    return res.sendStatus(403)
  }
})

app.use((err: any, req: any, res: any, next: any) => {
  res.status(500).send(String(err))
})

app.listen(port, () => {
  console.log(`Authentication server listening on http://localhost:${port}`)
})
