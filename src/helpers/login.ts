import { loginKey } from './constants'

export const login = () => {
  // Remove the query parameters from the URL bar, but toggle the loggedIn flag as true
  localStorage.setItem(loginKey, 'true')
}
