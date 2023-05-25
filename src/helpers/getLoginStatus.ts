import Cookies from 'js-cookie'
import { loginKey } from './constants'
import { isBrowser } from './isBrowser'

export const getLoginStatus = (): boolean => {
  if (isBrowser()) {
    const status =
      Cookies.get(loginKey) || localStorage.getItem(loginKey) === 'true'
    return Boolean(status)
  } else {
    return false
  }
}
