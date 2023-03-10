import { getApiUrl } from './getApiUrl'

export type Configuration = {
  resourceServerUri: string
  resourceServerUriWs: string
}

/** Return the configuration for the project */
export const getConfig = (): Configuration => {
  const [resourceServerUri, resourceServerUriWs] = getApiUrl()
  return {
    resourceServerUri,
    resourceServerUriWs,
  }
}
