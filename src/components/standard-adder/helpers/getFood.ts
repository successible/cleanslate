import dotProp from 'dot-prop-immutable'
import { Food } from '../../../models/food'

export const getFoodByName = (
  name: string,
  allFoods: Food[]
): Food | undefined => {
  const food = allFoods
    // Make sure longest name is tried first
    // Otherwise, Butter will be selected instead of Butter Lettuce
    .sort((a, b) => b.name.localeCompare(a.name))
    .find(
      // Normalize for case, just in case
      (food) =>
        // Is it an exact match, like Red Cabbage = Red Cabbage
        food.name.toLowerCase() === name.toLowerCase() ||
        // Is it an alias match, like Whole wheat past (dry) contains Whole wheat past (dry) ziti
        name.toLowerCase().includes(food.name.toLowerCase())
    )
  // Add the alias for the alias match
  return food && food.name !== name ? dotProp.set(food, 'alias', name) : food
}
