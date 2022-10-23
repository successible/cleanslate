import { loginKey } from '../data/constants'
import { getCookie } from '../data/getCookie'
import { isBrowser } from '../data/isBrowser'

export const getLoginStatus = (): boolean => {
  if (isBrowser()) {
    const status =
      getCookie(loginKey) || localStorage.getItem(loginKey) === 'true'
    return Boolean(status)
  } else {
    return false
  }
}
