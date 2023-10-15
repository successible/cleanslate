import { isProduction } from './isProduction'

export const getApiUrl = () => {
  const domain = process.env.NEXT_PUBLIC_HASURA_DOMAIN
  const cypress = process.env.NEXT_PUBLIC_CYPRESS
  if (isProduction()) {
    return [`https://${domain}/v1/graphql`, `wss://${domain}/v1/graphql`]
  } else if (cypress) {
    return [
      'http://localhost:8080/v1/graphql',
      'ws://localhost:8080/v1/graphql',
    ]
  } else {
    return [
      `https://${window.location.host}/v1/graphql`,
      `wss://${window.location.host}/v1/graphql`,
    ]
  }
}
