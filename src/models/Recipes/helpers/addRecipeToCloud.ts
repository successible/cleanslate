import { RecipeMutationInput } from '../../../components/forms/RecipeForm/helpers/formatDataForMutation'
import { getHasuraClient } from '../../../helpers/data/getHasuraClient'
import { handleError } from '../../../helpers/data/handleError'
import { stringifyQuery } from '../../../helpers/data/stringifyQuery'
import { CREATE_RECIPE } from '../schema'

export const addRecipeToCloud = (
  variables: RecipeMutationInput,
  onSuccess: () => void
) =>
  getHasuraClient()
    .then((client) => {
      client
        .request(stringifyQuery(CREATE_RECIPE), { object: variables })
        .then(() => {
          onSuccess()
        })
    })
    .catch((error) => handleError(error))
