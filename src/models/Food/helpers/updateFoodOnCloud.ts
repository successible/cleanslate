import { FoodSubmission } from '../../../components/forms/CustomFoodForm/CustomFoodForm'
import { getHasuraClient } from '../../../helpers/data/getHasuraClient'
import { handleError } from '../../../helpers/data/handleError'
import { stringifyQuery } from '../../../helpers/data/stringifyQuery'
import { UPDATE_FOOD } from '../schema'

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
