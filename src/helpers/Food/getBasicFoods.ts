import get from 'just-safe-get'
// @ts-ignore
import BasicFoods from '../../basicFoods.csv'
import { Food } from '../../models/food'

export const getBasicFoods = (): Food[] => {
  const foods = (BasicFoods as unknown as Food[]).map((food) => {
    food['caloriesPerGram'] = Number(get(food, 'caloriesPer100Gram')) / 100
    food['proteinPerGram'] = Number(get(food, 'proteinPer100Gram')) / 100
    food.foodToProfile = null
    food.type = 'food'
    food.id = String(food.basicFoodId)
    return food
  })

  return foods
}
