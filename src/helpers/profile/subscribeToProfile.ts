import dotProp from 'dot-prop-immutable'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { SUBSCRIBE_TO_DATA } from '../../graphql/profile'
import { Ingredient } from '../../models/ingredient'
import { Data } from '../../store/data/types'
import { createDateRange } from '../createDateRange'
import { getBasicFoods } from '../Food/getBasicFoods'
import { getStore } from '../getStore'
import { handleError } from '../handleError'
import { stringifyQuery } from '../stringifyQuery'
import { createProfile } from './createProfile'

export const subscribeToProfile = (client: SubscriptionClient) => {
  return client
    .request({
      query: stringifyQuery(SUBSCRIBE_TO_DATA),
      variables: createDateRange(),
    })
    .subscribe({
      error: (e) => {
        handleError(e)
      },
      next: (result) => {
        const { basicFoodsManifest } = getBasicFoods()
        const newData = result.data as Data
        const store = getStore()
        if (newData.profiles.length === 0) {
          createProfile().then(() => {})
        } else {
          const profiles = newData.profiles

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

          const profilesWithBasicFoods = dotProp.set(
            dotProp.set(profiles, '0.logs', logsWithBasicFoods),
            '0.recipes',
            recipesWithBasicFoods
          )

          // We update the entire profile with every subscription
          // That is because the payload is so small
          store.dispatch('updateProfile', profilesWithBasicFoods)
        }
      },
    })
}
