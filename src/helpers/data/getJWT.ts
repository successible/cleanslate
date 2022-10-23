import firebase from 'firebase/compat/app'
import { handleError } from './handleError'

export const getJWT = async function (): Promise<string> {
  try {
    // This automatically refreshes the tokens
    const JWT = await firebase.auth().currentUser?.getIdToken()
    return JWT || ''
  } catch (error) {
    handleError(error as Error)
    return ''
  }
}
