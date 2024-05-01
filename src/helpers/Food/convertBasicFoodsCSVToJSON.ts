import get from 'just-safe-get'
import type { Food } from '../../models/food'

export const convertBasicFoodsCSVToJSON = () => {
  // BasicFoods must derive from CSV
  const BasicFoods = [] as unknown as Food[]
  const basicFoodsManifest: Record<string, Food> = {}
  const basicFoods = (BasicFoods as unknown as Food[]).map((food) => {
    const basicFoodId = String(food.basicFoodId)
    food.caloriesPerGram = Number(get(food, 'caloriesPer100Gram')) / 100
    food.proteinPerGram = Number(get(food, 'proteinPer100Gram')) / 100
    food.foodToProfile = null
    food.type = 'food'
    food.id = basicFoodId
    basicFoodsManifest[basicFoodId] = food
    return food
  })
  return { basicFoods, basicFoodsManifest }
}
