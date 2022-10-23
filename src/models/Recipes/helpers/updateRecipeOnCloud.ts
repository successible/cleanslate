import { FormattedIngredient } from '../../../components/forms/RecipeForm/helpers/formatIngredient'
import { getHasuraClient } from '../../../helpers/data/getHasuraClient'
import { handleError } from '../../../helpers/data/handleError'
import { stringifyQuery } from '../../../helpers/data/stringifyQuery'
import { UPDATE_RECIPE } from '../schema'

export type UpdateRecipe = {
  pk_columns: {
    id: string
  }

  set: Partial<any>
  ingredients_to_delete: string[]
  ingredients_to_insert: FormattedIngredient[]
}

export const updateRecipeOnCloud = (
  variables: UpdateRecipe,
  onSuccess: () => void
) =>
  getHasuraClient()
    .then((client) => {
      client.request(stringifyQuery(UPDATE_RECIPE), variables).then(() => {
        onSuccess()
      })
    })
    .catch((error) => handleError(error))
