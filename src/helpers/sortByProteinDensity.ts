import {
  calculateFoodDensities,
  calculateRecipeDensities,
} from '../components/macros/helpers/calculateDensities'
import type { Food } from '../models/food'
import type { Recipe } from '../models/recipe'
import { categoriesToIgnore } from './sortByCaloricDensity'

export const sortByProteinDensity = (items: (Food | Recipe)[]) => {
  return items
    .sort((itemsA, itemsB) => {
      const A =
        itemsA.type === 'food'
          ? calculateFoodDensities(itemsA)[1]
          : calculateRecipeDensities(itemsA)[1]

      const B =
        itemsB.type === 'food'
          ? calculateFoodDensities(itemsB)[1]
          : calculateRecipeDensities(itemsB)[1]

      return B - A
    })
    .filter((food) => {
      if (food.type === 'food' && categoriesToIgnore.includes(food.category)) {
        return false
      }
      return true
    })
}
