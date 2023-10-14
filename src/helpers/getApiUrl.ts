export const getApiUrl = () => {
  return [
    `https://${window.location.host}/v1/graphql`,
    `wss://${window.location.host}/v1/graphql`,
  ]
}
