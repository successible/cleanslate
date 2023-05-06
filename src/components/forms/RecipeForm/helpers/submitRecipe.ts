import { produce } from 'immer'
import { addRecipeToCloud } from '../../../../helpers/recipes/addRecipeToCloud'
import { updateRecipeOnCloud } from '../../../../helpers/recipes/updateRecipeOnCloud'
import { Ingredient } from '../../../../models/ingredient'
import { Recipe } from '../../../../models/recipe'
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
      set: produce(data, (draft) => {
        // @ts-ignore
        delete draft.ingredients
      }),
    }
    return updateRecipeOnCloud(variables, () => {
      if (closeModal) {
        dispatch('closeRecipeFormModal')
        dispatch('closeMenu')
      }
    })
  } else {
    const variables = formatDataForMutation(data, ingredientsToUse, recipe?.id)
    return addRecipeToCloud(
      {
        ...variables.object,
        countToGram: data.countToGram,
        countToTbsp: data.countToTbsp,
        servingPerContainer: data.servingPerContainer,
      },
      () => {
        if (closeModal) {
          dispatch('closeRecipeFormModal')
        }
      }
    )
  }
}
