import basicFoodsJson from '../../basicFoods.json'
import type { Food } from '../../models/food'

export const getBasicFoods = () => {
  const basicFoods = basicFoodsJson as unknown as Food[]
  const basicFoodsManifest: Record<string, Food> = {}
  basicFoods.map((food) => {
    const { basicFoodId } = food
    if (basicFoodId) {
      basicFoodsManifest[basicFoodId] = food
    }
  })
  return { basicFoods, basicFoodsManifest }
}
