import { produce } from 'immer'
import { Ingredient } from '../../models/ingredient'
import { Profile } from '../../models/profile'
import { getBasicFoods } from '../Food/getBasicFoods'

const { basicFoodsManifest } = getBasicFoods()

export const addBasicFoodsToProfile = (profiles: Profile[]) => {
  const processIngredient = (ingredient: Ingredient) => {
    const basicFoodId = ingredient.basicFood
    if (basicFoodId) {
      ingredient.basicFood = basicFoodId
      ingredient.ingredientToFood = basicFoodsManifest[basicFoodId]
    }
    const childRecipe = ingredient.ingredientToChildRecipe
    if (childRecipe) {
      childRecipe.ingredients.map(processIngredient)
    }
    return ingredient
  }

  const logsWithBasicFoods = profiles[0].logs.map((log) => {
    const basicFoodId = log.basicFood
    // Map every basicFoodId in a food in a log to a fully fledged food
    if (basicFoodId) {
      log.basicFood = basicFoodId
      log.logToFood = basicFoodsManifest[basicFoodId]
    }
    // Map every basicFoodId in a food or childRecipe in an ingredient to a fully fledged food
    // Just changing the recipe object below is not enough
    const recipe = log.logToRecipe
    if (recipe) {
      recipe.ingredients.map(processIngredient)
    }
    return log
  })

  const recipesWithBasicFoods = profiles[0].recipes.map((recipe) => {
    // Map every basicFoodId in a food or childRecipe in an ingredient to a fully fledged food
    recipe.ingredients = recipe.ingredients.map((ingredient) => {
      return processIngredient(ingredient)
    })
    return recipe
  })

  const profilesWithBasicFoods = produce(profiles, (draft) => {
    draft[0].logs = logsWithBasicFoods
    draft[0].recipes = recipesWithBasicFoods
  })

  return profilesWithBasicFoods
}
