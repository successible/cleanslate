import type { Food } from '../../models/food'
import type { Data } from '../../store/data/types'

/** Combine basic foods and custom foods to get all the foods */
export const getFoods = (data: Data): Food[] => {
  const customFoods = data.profiles[0].foods
  const basicFoods = data.basicFoods
  return [...customFoods, ...basicFoods]
}
