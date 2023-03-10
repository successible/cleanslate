import Cookies from 'js-cookie'
import { loginKey } from './constants'
import { getDomain } from './getDomain'

export const clearLoginState = () => {
  // Remove any query parameters from the URL to prevent accidentally being logged back in
  window.history.replaceState(null, 'null', window.location.pathname)

  // Remove the logged in key
  localStorage.setItem(loginKey, 'null')
  Cookies.remove(loginKey, {
    domain: getDomain(),
  })
  // This dispatchEvent is required as the storage event usually only fires in the tab that does NOT trigger the event
  window.dispatchEvent(new Event('storage'))
}
