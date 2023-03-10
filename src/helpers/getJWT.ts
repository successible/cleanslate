import firebase from 'firebase/compat/app'
import { getCustomAuth, isCustomUser } from './getCustomAuth'
import { handleError } from './handleError'

export const getJWT = async function (): Promise<string> {
  try {
    const JWT = isCustomUser()
      ? // This is only useful on development when logging in as a different user
        getCustomAuth().token
      : // This automatically refreshes the tokens
        await firebase.auth().currentUser?.getIdToken()
    return JWT || ''
  } catch (error) {
    handleError(error as Error)
    return ''
  }
}
