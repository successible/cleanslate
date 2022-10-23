import { Food } from '../../../models/Food/model'
import { Recipe } from '../../../models/Recipes/model'
import { foodsToAdd } from '../constants/dummyFoods'
import { dynamicFoods } from '../constants/dynamicFoods'

/**
 * First, combine all foods and recipes
 * Finally, add the dummy food for that food, like turkey
 */
export const assembleSearchableFoods = (
  foods: Food[],
  recipes: Recipe[],
  excluded: string[]
): (Recipe | Food)[] => {
  const foodsToSearch = [...foods, ...foodsToAdd, ...dynamicFoods]
  return [...foodsToSearch, ...recipes].filter(
    (food) => !excluded.includes(food.name)
  )
}
