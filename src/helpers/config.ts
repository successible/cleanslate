import { getApiUrl } from "./getApiUrl";
import { getAuthenticationUrl } from "./getAuthenticationServerUrl";

export type Configuration = {
  authenticationServerUri: string;
  resourceServerUri: string;
  resourceServerUriWs: string;
};

/** Return the configuration for the project */
export const getConfig = (): Configuration => {
  const [resourceServerUri, resourceServerUriWs] = getApiUrl();
  const authenticationServerUri = getAuthenticationUrl();
  return {
    authenticationServerUri,
    resourceServerUri,
    resourceServerUriWs,
  };
};
