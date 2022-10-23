import { Food } from '../../../models/Food/model'
import { getNextLevel } from '../../searchbar/helpers/getNextLevel'
import { isDummyFood } from '../../searchbar/helpers/isDummyFood'
import { getFoodByName } from './getFood'

export const setNextLevelOrFindFood = (
  name: string,
  keys: string[],
  updateKeys: (keys: string[]) => void,
  foods: Food[],
  onSuccess: (food: Food) => void
) => {
  // If you can find the food from the name, just return the food
  const food = getFoodByName(name, foods)
  // If you don't have the isDummyFood check, it returns butter when you ask for butter lettuce
  // But, you only want the subset of relevant dummy foods, otherwise red wine vinegar will select red wine
  if (food && keys.length >= 1 && isDummyFood(name, keys[0])) {
    onSuccess(food)
  } else {
    // Otherwise, move down to the next level
    const nextLevelPath = [...keys, name]
    const nextLevel = getNextLevel(nextLevelPath)
    // If the category only contains one food, like American: ["American Cheese"]
    // Treat clicking on "American" as requesting the food American Cheese
    if (nextLevel && nextLevel.length === 1) {
      const food = getFoodByName(nextLevel[0], foods) as Food
      onSuccess(food)
    } else {
      updateKeys(nextLevelPath)
    }
  }
}
