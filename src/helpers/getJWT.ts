import firebase from 'firebase/compat/app'
import * as jose from 'jose'
import { tokenKey } from './constants'
import { firebaseEnabled } from './getFirebaseConfig'
import { handleError } from './handleError'

// The token is an API token but Hasura requires it in the format of a JWT
// However, an API token is already secure due to the length
// Hence, this JWT is a pointless (and insecure) wrapper for the very secure API token
// And because it is pointless, we leave the key on the client so that a server
// Is not required to generate it

export const SIGNING_KEY = 'd374e7c8-912c-4871-bac2-7dde6afc2b55'

export const getJWT = async function (token = ''): Promise<string> {
  if (firebaseEnabled) {
    try {
      const JWT = await firebase.auth().currentUser?.getIdToken()
      return JWT || ''
    } catch (error) {
      handleError(error as Error)
      return ''
    }
  } else {
    const tokenToUse = token || localStorage.getItem(tokenKey)
    const customClaims = {
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['user', 'admin'],
        'x-hasura-default-role': 'user',
        'x-hasura-user-id': tokenToUse,
        'x-hasura-username': tokenToUse,
      },
    }
    const secret = new TextEncoder().encode(SIGNING_KEY)
    const alg = 'HS256'
    const JWT = await new jose.SignJWT(customClaims)
      .setProtectedHeader({ alg })
      .sign(secret)

    return JWT
  }
}
