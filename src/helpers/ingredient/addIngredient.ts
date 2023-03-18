import { Unit } from '../../constants/units'
import { Food } from '../../models/food'
import { Ingredient } from '../../models/ingredient'
import { Profile } from '../../models/profile'
import { Recipe } from '../../models/recipe'

export const addIngredient = (
  item: Food | Recipe,
  amount: number,
  unit: Unit,
  basicFoodId: string | null
): Ingredient => {
  const isFood = item.type === 'food'
  const isRecipe = item.type === 'recipe'
  const ingredient = new Ingredient()
  ingredient.amount = amount
  ingredient.basicFood = basicFoodId
  ingredient.ingredientToChildRecipe = isRecipe ? item : null
  ingredient.ingredientToFood = isFood ? item : null
  ingredient.ingredientToProfile = new Profile()
  ingredient.unit = unit
  return ingredient
}
