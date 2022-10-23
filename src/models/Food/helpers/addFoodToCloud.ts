import { FoodSubmission } from '../../../components/forms/CustomFoodForm/CustomFoodForm'
import { getHasuraClient } from '../../../helpers/data/getHasuraClient'
import { handleError } from '../../../helpers/data/handleError'
import { stringifyQuery } from '../../../helpers/data/stringifyQuery'
import { CREATE_FOOD } from '../schema'

export const addFoodToCloud = (
  variables: FoodSubmission,
  onSuccess: () => void
) =>
  getHasuraClient()
    .then((client) => {
      client
        .request(stringifyQuery(CREATE_FOOD), { object: variables })
        .then(() => {
          onSuccess()
        })
    })
    .catch((error) => handleError(error))
