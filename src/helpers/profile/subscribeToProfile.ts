import dotProp from 'dot-prop-immutable'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { basicFoodsManifest } from '../../components/app/App'
import { SUBSCRIBE_TO_DATA } from '../../graphql/profile'
import { Data } from '../../store/data/types'
import { createDateRange } from '../createDateRange'
import { getStore } from '../getStore'
import { handleError } from '../handleError'
import { stringifyQuery } from '../stringifyQuery'
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
          const profiles = newData.profiles

          const logsWithBasicFoods = profiles[0].logs.map((log) => {
            const basicFoodId = log.basicFood
            if (basicFoodId) {
              log.logToFood = basicFoodsManifest[basicFoodId]
            }
            return log
          })

          const profilesWithBasicFoods = dotProp.set(
            profiles,
            '0.logs',
            logsWithBasicFoods
          )

          // We update the entire profile with every subscription
          // That is because the payload is so small
          store.dispatch('updateProfile', profilesWithBasicFoods)
        }
      },
    })
}
