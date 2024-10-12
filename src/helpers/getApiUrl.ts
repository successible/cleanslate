import { isBrowser } from './isBrowser'

export const getApiUrl = () => {
  const domain = isBrowser() ? window.location.hostname : ''
  return [`https://${domain}/v1/graphql`, `wss://${domain}/v1/graphql`]
}
