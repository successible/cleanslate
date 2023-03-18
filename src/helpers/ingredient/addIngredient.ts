import { Unit } from '../../constants/units'
import { Food } from '../../models/food'
import { Ingredient } from '../../models/ingredient'
import { Profile } from '../../models/profile'
import { Recipe } from '../../models/recipe'

export const addIngredient = (
  item: Food | Recipe,
  amount: number,
  unit: Unit,
  customFood: boolean
): Ingredient => {
  const isFood = item.type === 'food'
  const isRecipe = item.type === 'recipe'
  const ingredient = new Ingredient()
  ingredient.ingredientToFood = isFood && customFood ? item : null
  ingredient.ingredientToBasicFood = isFood && !customFood ? item : null
  ingredient.ingredientToChildRecipe = isRecipe ? item : null
  ingredient.amount = amount
  ingredient.unit = unit
  ingredient.ingredientToProfile = new Profile()
  return ingredient
}
