import { SubscriptionClient } from 'subscriptions-transport-ws'
import { SUBSCRIBE_TO_DATA } from '../../graphql/profile'
import { Data } from '../../store/data/types'
import { createDateRange } from '../createDateRange'
import { getStore } from '../getStore'
import { handleError } from '../handleError'
import { stringifyQuery } from '../stringifyQuery'
import { addBasicFoodsToProfile } from './addBasicFoodsToProfile'
import { createProfile } from './createProfile'

export const subscribeToProfile = (client: SubscriptionClient) => {
  return client
    .request({
      query: stringifyQuery(SUBSCRIBE_TO_DATA),
      variables: createDateRange(),
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
          // We update the entire profile with every subscription
          // That is because the payload is small
          store.dispatch(
            'updateProfile',
            addBasicFoodsToProfile(newData.profiles)
          )
        }
      },
    })
}
