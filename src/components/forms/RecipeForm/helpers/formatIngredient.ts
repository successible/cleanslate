import merge from 'deepmerge'
import type { Unit } from '../../../../constants/units'
import type { Ingredient } from '../../../../models/ingredient'
import type { Barcode } from '../../../../models/log'

export type FormattedIngredient = {
  amount: number
  barcode: Barcode | null
  basicFood: string | null // the ID of the food
  childRecipe: string | null // the ID of the child recipe
  food: string | null // the ID of the food
  recipe?: string
  unit: Unit
}

/** Format the Ingredient object into a shape that Hasura requires.
 *
 *  This means replacing the food object in Ingredient with the food id. Also, deleting many extra fields, like id, type, etc.
 */
export const formatIngredient = (
  ingredient: Ingredient,
  recipeId: string | undefined
): FormattedIngredient => {
  const { amount, barcode, basicFood, childRecipe, food, recipe, unit } = merge(
    ingredient,
    {
      barcode: ingredient.barcode,
      basicFood: ingredient.basicFood,
      childRecipe: ingredient.ingredientToChildRecipe?.id,
      food: !ingredient.basicFood ? ingredient.ingredientToFood?.id : null,
      recipe: recipeId,
    }
  )
  return {
    amount,
    barcode,
    basicFood,
    childRecipe,
    food,
    recipe,
    unit,
  }
}
