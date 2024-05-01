import firebase from 'firebase/compat/app'
import { firebaseEnabled } from './getFirebaseConfig'
import { getToken } from './getToken'
import { handleError } from './handleError'

export type TokenUser = {
  token: string
}

export type User = firebase.User | TokenUser

export const getUser = async (): Promise<User | null> => {
  if (firebaseEnabled) {
    try {
      const user = await firebase.auth().currentUser
      return user
    } catch (error) {
      handleError(error as Error)
      return null
    }
  } else {
    return { token: getToken() }
  }
}
