import firebase from 'firebase/compat/app'
import { handleError } from './handleError'

export type User = firebase.User

export const getUser = async (): Promise<User | null> => {
  try {
    // This automatically refreshes the tokens
    const user = await firebase.auth().currentUser
    return user
  } catch (error) {
    handleError(error as Error)
    return null
  }
}
