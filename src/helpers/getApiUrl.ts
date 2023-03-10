import { getCustomAuth, isCustomUser } from './getCustomAuth'
import { getDomain } from './getDomain'
import { isProduction } from './isProduction'

export const getApiUrl = () => {
  const proxyDomain = process.env.NEXT_PUBLIC_PROXY_ROOT_DOMAIN
  const domain = getDomain()
  if (isProduction()) {
    return [
      `https://api.${domain}/v1/graphql`,
      `wss://api.${domain}/v1/graphql`,
    ]
  }

  // This is only useful on development when logging in as a different user
  if (isCustomUser()) {
    return [
      `https://${getCustomAuth().domain}/v1/graphql`,
      `wss://${getCustomAuth().domain}/v1/graphql`,
    ]
  }

  // This is only useful on development when proxying localhost to access on a mobile device
  if (proxyDomain) {
    return [
      `https://${proxyDomain}/v1/graphql`,
      `wss://${proxyDomain}/v1/graphql`,
    ]
  }

  return ['http://localhost:8120/v1/graphql', 'ws://localhost:8120/v1/graphql']
}
