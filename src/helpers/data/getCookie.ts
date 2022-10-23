import Cookies from 'js-cookie'

export const getCookie = (name: string) => {
  return Cookies.get(name)
}
