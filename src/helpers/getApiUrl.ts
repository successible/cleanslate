import { isProduction } from './isProduction'

export const getApiUrl = () => {
  const hasuraDomain = process.env.NEXT_PUBLIC_HASURA_DOMAIN
  if (isProduction()) {
    return [
      `https://${hasuraDomain}/v1/graphql`,
      `wss://${hasuraDomain}/v1/graphql`,
    ]
  }
  return ['http://localhost:8120/v1/graphql', 'ws://localhost:8120/v1/graphql']
}
