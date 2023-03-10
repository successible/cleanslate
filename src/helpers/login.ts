import Cookies from 'js-cookie'
import { loginKey } from './constants'
import { getDomain } from './getDomain'

export const login = () => {
  // Remove the query parameters from the URL bar, but toggle the loggedIn flag as true
  localStorage.setItem(loginKey, 'true')
  Cookies.set(loginKey, 'true', {
    domain: getDomain(),
    expires: 5,
  })
}
