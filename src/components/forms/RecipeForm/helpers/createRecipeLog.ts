import type { Ingredient } from '../../../../models/ingredient'
import { Log } from '../../../../models/log'
import { Recipe } from '../../../../models/recipe'

/** Create an empty log with a recipe filled with the ingredients passed in */
export const createRecipeLog = (ingredients: Ingredient[]) => {
  const newRecipe = new Recipe()
  newRecipe.ingredients = ingredients
  const newLog = new Log()
  newLog.logToRecipe = newRecipe
  newLog.amount = 1
  newLog.unit = 'COUNT'
  return newLog
}
