import { type Category, categories } from '../../../constants/categories'
import type { Food } from '../../../models/food'

export const addCategoryToDummyFood = (food: Food): Category => {
  if (categories.includes(food.name as Category)) {
    return food.name as Category
  }
  throw Error(`${food.name} is not a valid group, check addCategoryToDummyFood`)
}
