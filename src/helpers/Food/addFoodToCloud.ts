import { FoodSubmission } from '../../components/forms/CustomFoodForm/CustomFoodForm'
import { CREATE_FOOD } from '../../graphql/food'
import { getHasuraClient } from '../getHasuraClient'
import { handleError } from '../handleError'
import { stringifyQuery } from '../stringifyQuery'

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
