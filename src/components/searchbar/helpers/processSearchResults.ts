import { Food } from '../../../models/Food/model'
import { Recipe } from '../../../models/Recipes/model'
import { createDummyFood } from './createDummyFood'
import { mapNameToDummyFood } from './mapNameToDummyFood'
import { removeDuplicatesByName } from './removeDuplicatesByName'

const isFoodOrItem = (result: Food | Recipe) => 'name' in result

/** Convert food-based search results to dummy foods, if needed, then remove any duplicates */
export const processSearchResults = (
  results: (Food | Recipe)[],
  resultsToShow: number
) => {
  const processedResults = results.map((result) => {
    if (isFoodOrItem(result)) {
      const dummy = mapNameToDummyFood(result.name)
      // If the name of the food matches a dummy food, like casein -> protein powder, return the dummy food
      // Otherwise, just return the food
      return dummy ? createDummyFood(dummy) : result
    } else {
      return result
    }
  })

  // processedResults will contain many duplicates by definition
  // For example, the query munster cheese will produce cheese twice
  return removeDuplicatesByName(processedResults).slice(0, resultsToShow)
}
