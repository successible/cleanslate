import Cookies from 'js-cookie'
import { loginKey } from '../data/constants'
import { getCookieDomain } from '../data/getCookieDomain'

export const login = () => {
  // Remove the query parameters from the URL bar, but toggle the loggedIn flag as true
  localStorage.setItem(loginKey, 'true')
  Cookies.set(loginKey, 'true', {
    // 10000 days
    domain: getCookieDomain(),
    expires: 10000,
  })
}
