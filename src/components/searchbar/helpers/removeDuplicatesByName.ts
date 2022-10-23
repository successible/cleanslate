import { Food } from '../../../models/Food/model'
import { Recipe } from '../../../models/Recipes/model'

/** Removes duplicates from a JSON array */
export const removeDuplicatesByName = (results: (Food | Recipe)[]) => {
  const names: Record<string, boolean> = {}
  return results.filter((result) => {
    if (names[result.name] === true) {
      return false
    } else {
      names[result.name] = true
      return true
    }
  })
}
