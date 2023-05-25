import Cookies from 'js-cookie'
import { tokenKey } from './constants'

export const getToken = () => Cookies.get(tokenKey) || ''
