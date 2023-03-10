/* eslint-disable @typescript-eslint/no-var-requires */

const shell = require('shelljs')
const axios = require('axios')
const admin = require('firebase-admin')
const serviceAccount = require('./service-account.json')
const config = require('./firebase-config.json')

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const uid = process.argv[2]
const domain = process.argv[3]

if (!uid || !domain) {
  throw Error(
    'You must specify the uid of the user in Firebase and the domain of your production API. Example: node admin.js XXX api.foo.com'
  )
}

const loginAsUser = async () => {
  const user = await app.auth().getUser(uid)
  const token = await app
    .auth()
    .createCustomToken(process.argv[2], user.customClaims)

  const result = await axios({
    data: {
      returnSecureToken: true,
      token,
    },
    json: true,
    method: 'post',
    url: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${config.apiKey}`,
  })

  process.env.NEXT_PUBLIC_UID = uid
  process.env.NEXT_PUBLIC_CUSTOM_TOKEN = result.data.idToken
  process.env.NEXT_PUBLIC_USER = JSON.stringify(user)
  process.env.NEXT_PUBLIC_PRODUCTION_API_DOMAIN = domain
  shell.exec('bash start.sh')
}

loginAsUser()
