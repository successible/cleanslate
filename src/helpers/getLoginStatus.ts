import { loginKey } from './constants'
import { isBrowser } from './isBrowser'

export const getLoginStatus = (): boolean => {
  if (isBrowser()) {
    const status = localStorage.getItem(loginKey) === 'true'
    return Boolean(status)
  }
  return false
}
