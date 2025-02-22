import type { Ingredient } from '../../../../models/ingredient'
import type { RecipeFormData } from '../RecipeForm'
import { addIngredients } from './addIngredients'
import { type FormattedIngredient, formatIngredient } from './formatIngredient'

export type RecipeMutationInput = {
  name: string | number
  countName: string | number
  countToGram: number | null
  countToTbsp: number | null
  servingPerContainer: number | null
  ingredients: {
    data: FormattedIngredient[]
  }
}

export const formatDataForMutation = (
  data: RecipeFormData,
  ingredientsToUse: Ingredient[],
  recipe?: string
) => {
  // Shape ingredients into the right format
  const ingredients = ingredientsToUse.map((ingredient) =>
    formatIngredient(ingredient, recipe)
  )
  const variables = {
    // Add those ingredients and tags in the right format for Hasura
    object: addIngredients(data, ingredients),
  }
  return variables
}
