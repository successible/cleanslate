import type firebase from 'firebase/compat/app'
import { store } from '../store/store'
import { handleError } from './handleError'
import { login } from './login'
import { sleep } from './sleep'

export const validateToken = async (userAuth: firebase.User, attempts = 0) => {
  if (attempts >= 10) {
    handleError('Error: validateToken')
    return null
  }
  const tokenResult = await userAuth.getIdTokenResult()
  const hasuraClaim = tokenResult.claims['https://hasura.io/jwt/claims']
  if (!hasuraClaim) {
    await userAuth.getIdToken(true)
    await sleep(200)
    validateToken(userAuth, attempts + 1)
  } else {
    login()
    store.dispatch('updateUser', userAuth)
  }
}
