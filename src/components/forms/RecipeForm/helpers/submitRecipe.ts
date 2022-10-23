import dotPropImmutable from 'dot-prop-immutable'
import { Ingredient } from '../../../../models/Ingredient/model'
import { addRecipeToCloud } from '../../../../models/Recipes/helpers/addRecipeToCloud'
import { updateRecipeOnCloud } from '../../../../models/Recipes/helpers/updateRecipeOnCloud'
import { Recipe } from '../../../../models/Recipes/model'
import { AllEvents } from '../../../../store/store'
import { Dispatch } from '../../../../store/types'
import { RecipeFormData } from '../RecipeForm'
import { formatDataForMutation } from './formatDataForMutation'

export const submitRecipe = (
  data: RecipeFormData,
  ingredientsToUse: Ingredient[],
  remoteIngredients: Ingredient[],
  recipe: Recipe | null,
  dispatch: Dispatch<AllEvents>,
  closeModal: boolean
) => {
  if (recipe?.id) {
    const formattedData = formatDataForMutation(
      data,
      ingredientsToUse,
      recipe.id
    )
    const ingredientsToInsert = formattedData.object.ingredients.data
    const remoteIds = remoteIngredients.map((ingredient) => ingredient.id)
    const variables = {
      ingredients_to_delete: remoteIds,
      ingredients_to_insert: ingredientsToInsert,
      pk_columns: { id: recipe.id },
      set: dotPropImmutable.delete(data, 'ingredients'),
    }
    return updateRecipeOnCloud(variables, () => {
      if (closeModal) {
        dispatch('closeRecipeFormModal')
        dispatch('closeMenu')
      }
    })
  } else {
    const variables = formatDataForMutation(data, ingredientsToUse, recipe?.id)
    return addRecipeToCloud(variables.object, () => {
      if (closeModal) {
        dispatch('closeRecipeFormModal')
      }
    })
  }
}
