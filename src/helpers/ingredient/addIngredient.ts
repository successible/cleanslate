import { Unit } from '../../constants/units'
import { Food } from '../../models/food'
import { Ingredient } from '../../models/ingredient'
import { Profile } from '../../models/profile'
import { Recipe } from '../../models/recipe'

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
  ingredient.ingredientToProfile = new Profile()
  return ingredient
}
