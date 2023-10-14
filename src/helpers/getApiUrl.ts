import { isProduction } from './isProduction'

export const getApiUrl = () => {
  const domain = process.env.NEXT_PUBLIC_HASURA_DOMAIN
  if (isProduction()) {
    return [`https://${domain}/v1/graphql`, `wss://${domain}/v1/graphql`]
  }
  return [
    `https://${window.location.host}/v1/graphql`,
    `wss://${window.location.host}/v1/graphql`,
  ]
}
