import deepmerge from 'deepmerge'
import { RecipeFormData } from '../RecipeForm'
import { RecipeMutationInput } from './formatDataForMutation'
import { FormattedIngredient } from './formatIngredient'

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
