import { Category, mapCategoryToGroup } from '../../../constants/categories'
import { Group } from '../../../constants/groups'
import { Food } from '../../../models/food'

/** .
 * If the food.name, like Turkey, is a valid group, add that to the dummyFood
 * Otherwise, throw an error */
export const addGroupToDummyFood = (food: Food): Group => {
  const group = mapCategoryToGroup(food.name as Category)
  if (group) {
    return food.name as Group
  } else {
    throw Error(`${food.name} is not a valid group, check addGroupToDummyFood`)
  }
}
