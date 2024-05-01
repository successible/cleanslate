import firebase from 'firebase/compat/app'
import { firebaseEnabled } from './getFirebaseConfig'
import { handleError } from './handleError'

export const getJWT = async (): Promise<string> => {
  if (firebaseEnabled) {
    try {
      const JWT = await firebase.auth().currentUser?.getIdToken()
      return JWT || ''
    } catch (error) {
      handleError(error as Error)
      return ''
    }
  } else {
    return localStorage.getItem('JWT') || ''
  }
}
