import { capitalize } from '../../../helpers/utility/capitalize'
import { Category } from '../../../models/Food/categories'
import { Group } from '../../../models/Food/groups'
import { Food } from '../../../models/Food/model'
import { addCategoryToDummyFood } from './addCategoryToDummyFood'
import { addGroupToDummyFood } from './addGroupToDummyFood'

/** The dummy food is the food used as the "standard bearer" for a bunch of related foods in the search bar.
 * For example, turkey is the standard bearer for turkey breast, turkey thigh, ground turkey, etc. */
export const createDummyFood = (
  name: string,
  group?: Group,
  category?: Category
): Food => {
  const food = new Food()
  food.name = capitalize(name)
  food.group = group || addGroupToDummyFood(food)
  food.category = category || addCategoryToDummyFood(food)
  food.isDummy = true
  return food
}
