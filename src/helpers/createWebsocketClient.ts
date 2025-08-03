import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

import { getConfig } from './config'
import { getJWT } from './getJWT'
import { handleError } from './handleError'

export const createWebsocketClient = () => {
  const client = new GraphQLWsLink(
    createClient({
      shouldRetry: (_e) => {
        return true
      },
      retryAttempts: 5,
      url: getConfig().resourceServerUriWs,
      connectionParams: () => {
        const JWT = getJWT()
          .then((token) => {
            return {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          })
          .catch((error) => handleError(error))
        return JWT as Record<string, any>
      },
    })
  )
  return client
}
