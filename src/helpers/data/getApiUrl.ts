import { isProduction } from '../ui/isProduction'
import { getDomain } from './getDomain'

export const getApiUrl = () => {
  const proxyDomain = process.env.PROXY_ROOT_DOMAIN
  const domain = getDomain()
  if (isProduction()) {
    return [
      `https://api.${domain}/v1/graphql`,
      `wss://api.${domain}/v1/graphql`,
    ]
  } else {
    if (proxyDomain) {
      return [
        `http://lion.${proxyDomain}/v1/graphql`,
        `ws://lion.${proxyDomain}/v1/graphql`,
      ]
    } else {
      return [
        'http://localhost:8120/v1/graphql',
        'ws://localhost:8120/v1/graphql',
      ]
    }
  }
}
