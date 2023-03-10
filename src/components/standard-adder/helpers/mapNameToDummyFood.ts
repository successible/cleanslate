import { dummyFoods } from '../../../constants/dummyFoods/dummyFoods'
import { pastaNames } from '../../../constants/dummyFoods/pasta'
import { Food } from '../../../models/food'
import { Recipe } from '../../../models/recipe'
import { createDummyFood } from './createDummyFood'
import { getAllDummyFoodLeaves } from './getAllDummyFoodLeaves'

export const mapFoodToDummyFood = (item: Food | Recipe) => {
  const leaves = getAllDummyFoodLeaves(dummyFoods)
  const dummyFoodName = leaves[item.name]
  // Example: [chicken breast with skin (cooked)] -> Chicken
  if (dummyFoodName) {
    return createDummyFood(dummyFoodName)
    // Example: Penne -> Pasta
  } else if (pastaNames.includes(item.name)) {
    return createDummyFood('Pasta', 'Grain', 'Pasta')
  } else {
    // The food is not a dummy food, just return it
    return item
  }
}
