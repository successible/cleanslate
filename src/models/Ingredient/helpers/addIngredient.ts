import { Food } from '../../Food/model'
import { Unit } from '../../Log/types'
import { Recipe } from '../../Recipes/model'
import { Ingredient } from '../model'

export const addIngredient = (
  item: Food | Recipe,
  amount: number,
  unit: Unit
): Ingredient => {
  const ingredient = new Ingredient()
  ingredient.ingredientToFood = item.type === 'food' ? item : null
  ingredient.ingredientToChildRecipe = item.type === 'recipe' ? item : null
  ingredient.amount = amount
  ingredient.unit = unit
  return ingredient
}
