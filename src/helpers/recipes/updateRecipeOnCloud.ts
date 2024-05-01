import type { FormattedIngredient } from '../../components/forms/RecipeForm/helpers/formatIngredient'
import { UPDATE_RECIPE } from '../../graphql/recipe'
import { getHasuraClient } from '../getHasuraClient'
import { handleError } from '../handleError'
import { stringifyQuery } from '../stringifyQuery'

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
