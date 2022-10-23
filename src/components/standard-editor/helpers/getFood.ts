import dotPropImmutable from 'dot-prop-immutable'
import { Food } from '../../../models/Food/model'

export const getFoodByName = (
  name: string,
  allFoods: Food[]
): Food | undefined => {
  const food = allFoods.find(
    // Normalize for case, just in case
    (food) =>
      // Is it an exact match, like Red Cabbage = Red Cabbage
      food.name.toLowerCase() === name.toLowerCase() ||
      // Is it an alias match, like Whole wheat past (dry) contains Whole wheat past (dry) ziti
      name.toLowerCase().includes(food.name.toLowerCase())
  )
  // All the alias for the alias match
  return food && food.name !== name
    ? dotPropImmutable.set(food, 'alias', name)
    : food
}
