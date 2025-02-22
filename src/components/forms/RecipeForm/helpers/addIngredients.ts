import deepmerge from 'deepmerge'
import type { RecipeFormData } from '../RecipeForm'
import type { RecipeMutationInput } from './formatDataForMutation'
import type { FormattedIngredient } from './formatIngredient'

/** Add the formatted ingredients and tag in a way that can be accepted by Hasura
 *
 * That means replacing ingredients: Ingredient[] with ingredients: { data: Ingredient[]}. tags undergoes a similar process
 */
export const addIngredients = (
  formData: RecipeFormData,
  formattedIngredients: FormattedIngredient[]
): RecipeMutationInput => {
  const { ...data } = formData
  return deepmerge(data, { ingredients: { data: formattedIngredients } })
}
