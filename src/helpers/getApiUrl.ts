import { isProduction } from './isProduction'

export const getApiUrl = () => {
  const proxyDomain = process.env.NEXT_PUBLIC_PROXY_DOMAIN
  const hasuraDomain = process.env.NEXT_PUBLIC_HASURA_DOMAIN

  if (isProduction()) {
    return [
      `https://${hasuraDomain}/v1/graphql`,
      `wss://${hasuraDomain}/v1/graphql`,
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
