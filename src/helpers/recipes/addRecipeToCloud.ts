import type { RecipeMutationInput } from '../../components/forms/RecipeForm/helpers/formatDataForMutation'
import { CREATE_RECIPE } from '../../graphql/recipe'
import { getHasuraClient } from '../getHasuraClient'
import { handleError } from '../handleError'
import { stringifyQuery } from '../stringifyQuery'

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
