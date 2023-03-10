import { Ingredient } from '../../../../models/ingredient'
import { RecipeFormData } from '../RecipeForm'
import { addIngredients } from './addIngredients'
import { formatIngredient, FormattedIngredient } from './formatIngredient'

export type RecipeMutationInput = {
  name: string | number
  countName: string | number
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
