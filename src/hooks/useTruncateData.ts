import { useEffect } from 'react'
import { DELETE_ALL_PROFILES } from '../graphql/profile'
import { isCustomUser } from '../helpers/getCustomAuth'
import { getHasuraClient } from '../helpers/getHasuraClient'
import { isProduction } from '../helpers/isProduction'
import { stringifyQuery } from '../helpers/stringifyQuery'

export const useTruncateData = () => {
  useEffect(() => {
    if (isCustomUser() && !isProduction()) {
      getHasuraClient().then((client) => {
        client.request(stringifyQuery(DELETE_ALL_PROFILES), {}).then(() => {
          console.log('Data truncated')
        })
      })
    }
  }, [])
}
