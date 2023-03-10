import Cookies from 'js-cookie'
import { loginKey } from './constants'
import { isCustomUser } from './getCustomAuth'
import { isBrowser } from './isBrowser'

export const getLoginStatus = (): boolean => {
  if (isBrowser()) {
    const status =
      Cookies.get(loginKey) ||
      localStorage.getItem(loginKey) === 'true' ||
      // This is only useful on development when logging in as a different user
      isCustomUser()
    return Boolean(status)
  } else {
    return false
  }
}
