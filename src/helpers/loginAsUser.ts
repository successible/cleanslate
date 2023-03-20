import axios from 'axios'
import * as admin from 'firebase-admin'
import fs from 'fs'
import { getFirebaseConfig } from './getFirebaseConfig'
import { getFirebaseServiceAccount } from './getFirebaseServiceAccount'

const config = getFirebaseConfig()
const serviceAccount = getFirebaseServiceAccount()
const uid = process.env['CYPRESS_TEST_UID'] || 'XXX'

export const loginAsUser = async () => {
  const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })

  const user = await app.auth().getUser(uid)
  const token = await app.auth().createCustomToken(uid, user.customClaims)
  const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${config.apiKey}`
  const response = await axios.post(url, { returnSecureToken: true, token })
  const data = await response.data
  return [data, user]
}

loginAsUser().then((result) => {
  const [data, user] = result
  fs.writeFileSync(
    'secrets.json',
    JSON.stringify({
      NEXT_PUBLIC_CUSTOM_TOKEN: data.idToken,
      NEXT_PUBLIC_PRODUCTION_API_DOMAIN: 'localhost',
      NEXT_PUBLIC_UID: uid,
      NEXT_PUBLIC_USER: user,
    })
  )
})
