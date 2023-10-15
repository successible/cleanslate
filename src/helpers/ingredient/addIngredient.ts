import { Unit } from '../../constants/units'
import { Food } from '../../models/food'
import { Ingredient } from '../../models/ingredient'
import { Barcode } from '../../models/log'
import { Profile } from '../../models/profile'
import { Recipe } from '../../models/recipe'

export const addIngredient = (
  item: Food | Recipe | null | undefined,
  barcode: Barcode | null,
  amount: number,
  unit: Unit,
  basicFoodId: string | null
): Ingredient => {
  // Make sure a custom food has the right values
  // Only relevant for a newly added custom food via the barcode scanner
  if (item?.type === 'food' && !basicFoodId) {
    item.category = 'Food'
    item.group = 'Custom'
    item.basicFoodId = null
  }
  const ingredient = new Ingredient()
  ingredient.amount = amount
  ingredient.barcode = barcode
  ingredient.basicFood = basicFoodId
  ingredient.childRecipe = item?.type === 'recipe' ? item.id : null
  ingredient.food = item?.type === 'food' ? item.id : null
  ingredient.ingredientToChildRecipe = item?.type === 'recipe' ? item : null
  ingredient.ingredientToFood = item?.type === 'food' ? item : null
  ingredient.ingredientToProfile = new Profile()
  ingredient.unit = unit
  return ingredient
}
