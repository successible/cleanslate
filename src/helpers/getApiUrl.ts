import { isBrowser } from './isBrowser'

export const getApiUrl = () => {
  var host = ''
  if (process.env.NEXT_PUBLIC_AUTH_HOST) {
    host = process.env.NEXT_PUBLIC_AUTH_HOST
  } else if (isBrowser()) {
    host = window.location.hostname
  }
  const domain = host
  return [`https://${domain}/v1/graphql`, `wss://${domain}/v1/graphql`]
}
