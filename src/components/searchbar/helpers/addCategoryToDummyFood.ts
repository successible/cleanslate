import { categories, Category } from '../../../models/Food/categories'
import { Food } from '../../../models/Food/model'

export const addCategoryToDummyFood = (food: Food): Category => {
  if (categories.includes(food.name as Category)) {
    return food.name as Category
  } else {
    throw Error(
      `${food.name} is not a valid group, check addCategoryToDummyFood`
    )
  }
}
