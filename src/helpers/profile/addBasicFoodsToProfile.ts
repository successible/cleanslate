import { produce } from 'immer'
import { Ingredient } from '../../models/ingredient'
import { Profile } from '../../models/profile'
import { getBasicFoods } from '../Food/getBasicFoods'

const { basicFoodsManifest } = getBasicFoods()

// We need a placeholder for the deleted log so calculateMetric does not error
const WATER = basicFoodsManifest['fc85e08d-f76a-4f4e-98ef-8a8d33e600fd']

export const addBasicFoodsToProfile = (profiles: Profile[]) => {
  const missingBasicFoods: string[] = []

  const processIngredient = (ingredient: Ingredient) => {
    const basicFoodId = ingredient.basicFood
    if (basicFoodId) {
      const basicFood = basicFoodsManifest[basicFoodId]
      ingredient.basicFood = basicFoodId
      if (basicFood) {
        ingredient.ingredientToFood = basicFoodsManifest[basicFoodId]
      } else {
        missingBasicFoods.push(basicFoodId)
        ingredient.ingredientToFood = WATER
      }
    }
    const childRecipe = ingredient.ingredientToChildRecipe
    if (childRecipe) {
      childRecipe.ingredients.map(processIngredient)
    }
    return ingredient
  }

  const logsWithBasicFoods = profiles[0].logs

    .map((log) => {
      const basicFoodId = log.basicFood
      // Map every basicFoodId in a food in a log to a fully fledged food
      if (basicFoodId) {
        const basicFood = basicFoodsManifest[basicFoodId]
        if (basicFood) {
          log.basicFood = basicFoodId
          log.logToFood = basicFoodsManifest[basicFoodId]
        } else {
          missingBasicFoods.push(basicFoodId)
          log.logToFood = WATER
        }
      }
      // Map every basicFoodId in a food or childRecipe in an ingredient to a fully fledged food
      // Just changing the recipe object below is not enough
      const recipe = log.logToRecipe
      if (recipe) {
        recipe.ingredients.map(processIngredient)
      }
      return log
    })
    .filter((log) => {
      // In the event that basic foods are missing, we want to hide the dependent logs
      // Until  has had a chance to run.
      // That way, we avoid a flicker of the log as water
      const basicFoodId = log.basicFood
      return (basicFoodId && basicFoodsManifest[basicFoodId]) || !basicFoodId
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

  return { missingBasicFoods, profiles: profilesWithBasicFoods }
}
