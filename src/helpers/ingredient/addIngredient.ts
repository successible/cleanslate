import type { Unit } from '../../constants/units'
import type { Food } from '../../models/food'
import { Ingredient } from '../../models/ingredient'
import type { Barcode } from '../../models/log'
import { Profile } from '../../models/profile'
import type { Recipe } from '../../models/recipe'

export const addIngredient = (
  item: Food | Recipe | null | undefined,
  barcode: Barcode | null,
  amount: number,
  unit: Unit,
  basicFoodId: string | null
): Ingredient => {
  // Make sure a custom food has the right values
  // Only relevant for a newly added custom food via the barcode scanner
  if (item?.type === 'food' && (!basicFoodId || barcode)) {
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

  if (barcode) {
    // The barcode needs a basic food that is real (water)
    // Without a basic food, the foreign key constraint will fail
    // With a random basic food, the ingredient will get deleted by handleMissingBasicFoods
    ingredient.basicFood = 'fc85e08d-f76a-4f4e-98ef-8a8d33e600fd'
  }

  return ingredient
}
