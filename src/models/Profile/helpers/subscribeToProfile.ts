import { SubscriptionClient } from 'subscriptions-transport-ws'
import { createProfile } from '../../../helpers/authentication/createProfile'
import { createDateRange } from '../../../helpers/data/createDateRange'
import { getStore } from '../../../helpers/data/getStore'
import { handleError } from '../../../helpers/data/handleError'
import { stringifyQuery } from '../../../helpers/data/stringifyQuery'
import { Data } from '../../../store/data/types'
import { Profile } from '../model'
import { SUBSCRIBE_TO_DATA } from '../schema'

export const subscribeToProfile = (
  client: SubscriptionClient,
  profile?: Profile
) => {
  return client
    .request({
      query: stringifyQuery(SUBSCRIBE_TO_DATA),
      variables: createDateRange(profile),
    })
    .subscribe({
      error: (e) => {
        handleError(e)
      },
      next: (result) => {
        const newData = result.data as Data
        const store = getStore()
        if (newData.profiles.length === 0) {
          createProfile().then(() => {})
        } else {
          // Unlike basic foods, we update the entire profile with every subscription
          // The payload is so small that it{`'`}s a best practice
          const { profiles } = newData
          store.dispatch('updateProfile', profiles)
        }
      },
    })
}
