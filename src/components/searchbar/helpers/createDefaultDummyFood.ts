import { Food } from '../../../models/Food/model'

export const createDefaultDummyFood = () => {
  const food = new Food()
  food.isDummy = true
  return food
}
