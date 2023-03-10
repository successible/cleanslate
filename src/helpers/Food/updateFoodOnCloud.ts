import { FoodSubmission } from '../../components/forms/CustomFoodForm/CustomFoodForm'
import { UPDATE_FOOD } from '../../graphql/food'
import { getHasuraClient } from '../getHasuraClient'
import { handleError } from '../handleError'
import { stringifyQuery } from '../stringifyQuery'

export type UpdateFood = {
  pk_columns: {
    id: string
  }
  set: FoodSubmission
}

export const updateFoodOnCloud = (
  variables: UpdateFood,
  onSuccess: () => void
) =>
  getHasuraClient()
    .then((client) => {
      client.request(stringifyQuery(UPDATE_FOOD), variables).then(() => {
        onSuccess()
      })
    })
    .catch((error) => handleError(error))
