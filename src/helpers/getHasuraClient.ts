import { ax } from './axios'
import { getConfig } from './config'
import { getJWT } from './getJWT'
import {
  Client,
  PendingClient,
  stopRequestIfOffline,
} from './stopRequestIfOffline'

export const getHasuraClient = (JWT = ''): PendingClient => {
  return stopRequestIfOffline()
    .then(() => {
      if (JWT) {
        return JWT
      } else {
        return getJWT()
      }
    })
    .then((token) => {
      const request: Client = {
        request: (query, variables) => {
          const headers = token
            ? { Authorization: `Bearer ${token}` }
            : { Authorization: '' }
          return ax()
            .post(
              getConfig().resourceServerUri,
              { query, variables },
              { headers }
            )
            .then((response) => {
              const { data } = response
              if (data.errors && data.errors.length >= 1) {
                const message = data.errors[0].message
                throw message
              } else {
                // Hasura return data, as does Axios, hence double data!
                return data.data
              }
            })
            .catch((error) => {
              throw error
            })
        },
      }
      return request
    })
}
