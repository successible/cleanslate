import { Ingredient } from '../../../../models/Ingredient/model'
import { Log } from '../../../../models/Log/model'
import { Recipe } from '../../../../models/Recipes/model'

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
