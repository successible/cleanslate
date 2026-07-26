import { isBrowser } from './isBrowser'

export const getAuthenticationUrl = (): string => {
  var host = ''
  if (process.env.NEXT_PUBLIC_AUTH_HOST) {
    host = process.env.NEXT_PUBLIC_AUTH_HOST
  } else if (isBrowser()) {
    host = window.location.hostname
  }
  const domain = host
  return `https://${domain}/auth`
}
