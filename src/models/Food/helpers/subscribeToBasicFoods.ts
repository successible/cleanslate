import equal from 'fast-deep-equal'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { handleError } from '../../../helpers/data/handleError'
import { stringifyQuery } from '../../../helpers/data/stringifyQuery'
import { getCachedData } from '../../../store/data/getCachedData'
import { Data } from '../../../store/data/types'
import { Food } from '../model'
import { SUBSCRIBE_TO_BASIC_FOOD } from '../schema'
import { fetchBasicFoods } from './fetchBasicFoods'

export const subscribeToBasicFoods = (client: SubscriptionClient) => {
  return client
    .request({
      query: stringifyQuery(SUBSCRIBE_TO_BASIC_FOOD),
    })
    .subscribe({
      error: (e) => {
        handleError(e)
      },
      next: (result) => {
        if (result?.data?.foods) {
          const cloudBasicFoods = result.data.foods as Food[]
          const data: Data = getCachedData()
          const localBasicFoods = data && data.basicFoods
          // If local, basic foods contains the exact copy of the most recently updated food, do nothing
          const isEqual = equal(cloudBasicFoods[0], localBasicFoods[0])
          if (!isEqual) {
            console.log('The basic foods have changed. Refreshing them now...')
            fetchBasicFoods(true)
              .then(() => {})
              .catch((error) => {
                handleError(error)
              })
          } else {
            // Do nothing
          }
        }
      },
    })
}
