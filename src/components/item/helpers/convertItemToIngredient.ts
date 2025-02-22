import { Ingredient } from '../../../models/ingredient'
import type { CommonItem } from '../types'

export const convertItemToIngredient = (
  item: CommonItem,
  amount?: number | null
): Ingredient => {
  const ingredient = new Ingredient()

  ingredient.type = 'ingredient'

  if (item.food) {
    ingredient.ingredientToFood = item.food
  }
  if (item.recipe) {
    ingredient.ingredientToRecipe = item.recipe
  }
  if (item.childRecipe) {
    ingredient.ingredientToChildRecipe = item.childRecipe
  }

  if (amount) {
    ingredient.amount = amount
  } else if (item.amount) {
    ingredient.amount = item.amount
  }

  if (item.unit) {
    ingredient.unit = item.unit
  }

  return ingredient
}
