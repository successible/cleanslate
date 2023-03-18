import merge from 'deepmerge'
import { Unit } from '../../../../constants/units'
import { Ingredient } from '../../../../models/ingredient'

export type FormattedIngredient = {
  amount: number
  basicFood: string | null // the ID of the basic food
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
  // @ts-ignore
  const { amount, basicFood, childRecipe, food, recipe, unit } = merge(
    ingredient,
    {
      basicFood: ingredient.ingredientToBasicFood?.id,
      childRecipe: ingredient.ingredientToChildRecipe?.id,
      food: ingredient.ingredientToFood?.id,
      recipe: recipeId,
    }
  )
  return {
    amount,
    basicFood,
    childRecipe,
    food,
    recipe,
    unit,
  }
}
