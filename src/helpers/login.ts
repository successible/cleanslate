import { loginKey } from './constants'

export const login = () => {
  localStorage.setItem(loginKey, 'true')
}
