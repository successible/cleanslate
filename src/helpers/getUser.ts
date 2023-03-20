import firebase from 'firebase/compat/app'
import { isCustomUser } from './getCustomAuth'
import { getCustomAuth } from './getCustomAuth'
import { handleError } from './handleError'

export type User = firebase.User

export const getUser = async (): Promise<User | null> => {
  try {
    const user = isCustomUser()
      ? getCustomAuth().user
      : await firebase.auth().currentUser
    return user
  } catch (error) {
    handleError(error as Error)
    return null
  }
}
