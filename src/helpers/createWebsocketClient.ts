import { SubscriptionClient } from "subscriptions-transport-ws";
import { getConfig } from "./config";
import { getJWT } from "./getJWT";
import { handleError } from "./handleError";

export const createWebsocketClient = () => {
  return new SubscriptionClient(getConfig().resourceServerUriWs, {
    connectionParams: () =>
      getJWT()
        .then((token) => {
          return {
            headers: {
              authorization: `Bearer ${token}`,
            },
          };
        })
        .catch((error) => handleError(error)),
    reconnect: true,
  });
};
