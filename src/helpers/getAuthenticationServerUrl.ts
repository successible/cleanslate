import { isBrowser } from './isBrowser'

export const getAuthenticationUrl = (): string => {
  const domain = isBrowser() ? window.location.hostname : ''
  return `https://${domain}/auth`
}
