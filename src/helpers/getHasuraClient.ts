import { ax } from './axios'
import { getConfig } from './config'
import { getJWT } from './getJWT'
import { handleError } from './handleError'
import {
  Client,
  PendingClient,
  stopRequestIfOffline,
} from './stopRequestIfOffline'

export const getHasuraClient = (): PendingClient => {
  return stopRequestIfOffline()
    .then(() => {
      return getJWT()
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
                handleError(message)
              } else {
                // Hasura return data, as does Axios, hence double data!
                return data.data
              }
            })
            .catch((error) => {
              handleError(error)
              return error
            })
        },
      }
      return request
    })
}
