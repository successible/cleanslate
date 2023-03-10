import { categories, Category } from '../../../constants/categories'
import { Food } from '../../../models/food'

export const addCategoryToDummyFood = (food: Food): Category => {
  if (categories.includes(food.name as Category)) {
    return food.name as Category
  } else {
    throw Error(
      `${food.name} is not a valid group, check addCategoryToDummyFood`
    )
  }
}
