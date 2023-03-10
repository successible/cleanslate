import { dummyFoods } from '../../../constants/dummyFoods/dummyFoods'
import { Food } from '../../../models/food'
import { Recipe } from '../../../models/recipe'
import { createDummyFood } from './createDummyFood'
import { getAllDummyFoodLeaves } from './getAllDummyFoodLeaves'

/** The goal of this function is to take a food name, like chicken breast with skin, and match it to the
 * parent dummy food if it has one, in this case, chicken. If it does not have one, return null.
 */
export const mapFoodToDummyFood = (item: Food | Recipe) => {
  const leaves = getAllDummyFoodLeaves(dummyFoods)
  const dummyFoodName = leaves[item.name]
  return dummyFoodName ? createDummyFood(dummyFoodName) : item
}
