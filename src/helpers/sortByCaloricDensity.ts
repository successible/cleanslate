import {
  calculateFoodDensities,
  calculateRecipeDensities,
} from '../components/macros/helpers/calculateDensities'
import type { Category } from '../constants/categories'
import type { Food } from '../models/food'
import type { Recipe } from '../models/recipe'

export const categoriesToIgnore = [
  'Beverage',
  'Nut milk',
  'Sauce',
  'Spice',
  'Stock',
  'Sweetener',
  'Vinegar',
] as Category[]

export const sortByCaloricDensity = (items: (Food | Recipe)[]) => {
  return items
    .sort((itemsA, itemsB) => {
      const A =
        itemsA.type === 'food'
          ? calculateFoodDensities(itemsA)[0]
          : calculateRecipeDensities(itemsA)[0]

      const B =
        itemsB.type === 'food'
          ? calculateFoodDensities(itemsB)[0]
          : calculateRecipeDensities(itemsB)[0]

      return A - B
    })
    .filter((food) => {
      if (food.type === 'food' && categoriesToIgnore.includes(food.category)) {
        return false
      }
      return true
    })
}
