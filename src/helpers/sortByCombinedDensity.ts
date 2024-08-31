import {
  calculateFoodDensities,
  calculateRecipeDensities,
} from '../components/macros/helpers/calculateDensities'
import { calculatePerMacroPerRecipe } from '../components/macros/helpers/calculateMacros'
import type { Food } from '../models/food'
import type { Recipe } from '../models/recipe'
import { categoriesToIgnore } from './sortByCaloricDensity'

export const sortByCombinedDensity = (items: (Food | Recipe)[]) => {
  return items
    .sort((itemsA, itemsB) => {
      const A =
        itemsA.type === 'food'
          ? calculateFoodDensities(itemsA)[2]
          : calculateRecipeDensities(itemsA)[2]

      const B =
        itemsB.type === 'food'
          ? calculateFoodDensities(itemsB)[2]
          : calculateRecipeDensities(itemsB)[2]

      return B - A
    })
    .filter((food) => {
      if (food.type === 'food' && categoriesToIgnore.includes(food.category)) {
        return false
      }
      return true
    })
}
