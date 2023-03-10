import merge from 'deepmerge'
import { Unit } from '../../../../constants/units'
import { Ingredient } from '../../../../models/ingredient'

export type FormattedIngredient = {
  amount: number
  unit: Unit
  food: string | null // the ID of the food
  recipe?: string
  childRecipe: string | null // the ID of the child recipe
}

/** Format the Ingredient object into a shape that Hasura requires.
 *
 *  This means replacing the food object in Ingredient with the food id. Also, deleting many extra fields, like id, type, etc.
 */
export const formatIngredient = (
  ingredient: Ingredient,
  recipeId: string | undefined
): FormattedIngredient => {
  // @ts-ignore
  const { amount, childRecipe, food, recipe, unit } = merge(ingredient, {
    childRecipe: ingredient.ingredientToChildRecipe?.id,
    food: ingredient.ingredientToFood?.id,
    recipe: recipeId,
  })
  return {
    amount,
    childRecipe,
    food,
    recipe,
    unit,
  }
}
