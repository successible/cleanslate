import type { FoodSubmission } from '../../components/forms/CustomFoodForm/CustomFoodForm'
import { CREATE_FOOD } from '../../graphql/food'
import { getHasuraClient } from '../getHasuraClient'
import { handleError } from '../handleError'
import { stringifyQuery } from '../stringifyQuery'

export const addFoodToCloud = (
  variables: FoodSubmission,
  onSuccess: (id: string) => void
) =>
  getHasuraClient()
    .then((client) => {
      client
        .request(stringifyQuery(CREATE_FOOD), { object: variables })
        .then((e: { insert_foods_one: { id: string } }) => {
          onSuccess(e.insert_foods_one.id)
        })
    })
    .catch((error) => handleError(error))
