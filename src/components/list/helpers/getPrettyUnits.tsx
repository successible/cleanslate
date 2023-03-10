import { volumeUnits, weightUnits } from '../../../constants/units'
import { defaultContainer, defaultCount, Unit } from '../../../constants/units'
import { zipObject } from '../../../helpers/zipObject'
import { Food } from '../../../models/food'
import { Recipe } from '../../../models/recipe'

/**
 * Given the all possible units, it slims and prettifies those units for each food item or dictionary.
 * Ultimately, this function creates a dictionary of defaultUnit:prettyUnit. In most cases, the prettyUnit and defaultUnit are identical!
 * Thus, the dictionary looks like this.
 * {TBSP: "TBSP", "GRAM": "GRAM", "COUNT": "COUNT"}, etc.
 * - If the food item does NOT have values for countName or volume (i.e. TBSP) in the database, those key:value pairs are removed
 * - If the food item has a "pretty" name for count (i.e. onion), the default value of "COUNT" is replaced with the prettyName
 */

export const getPrettyUnits = (item: Food | Recipe) => {
  // If tbspToGram exists, include the volume units
  const volume =
    item.type === 'food'
      ? item?.countToTbsp || item?.tbspToGram
        ? volumeUnits
        : []
      : []

  const volumeDict = zipObject(volume, volume)

  // Only foods have weight units. Recipes deal purely in counts!
  const weight =
    item.type === 'food' && (item.caloriesPerGram || item.countToGram)
      ? weightUnits
      : []

  const weightDict = zipObject(weight, weight)

  // If countName exists OR it is a recipe OR caloriesPerCount or proteinPerCount, include the COUNT unit
  const count =
    item.type === 'recipe' ||
    (item.type === 'food' && item?.countName) ||
    (item.type === 'food' &&
      (item.caloriesPerCount || item.caloriesPerCount === 0) &&
      (item.proteinPerCount || item.proteinPerCount === 0))
      ? ['COUNT']
      : []

  const countDict = zipObject(count, count)
  if (countDict.COUNT) {
    countDict.COUNT = item.countName || defaultCount
  }
  // If the item has caloriesPerCount, proteinPerCount, and servingPerCount, only then render the count unit
  const container =
    item.type === 'food' &&
    (item.caloriesPerCount || item.caloriesPerCount === 0) &&
    (item.proteinPerCount || item.proteinPerCount === 0) &&
    item.servingPerContainer
      ? ['CONTAINER']
      : []

  const containerDict = zipObject(container, container)
  if (containerDict.COUNT) {
    containerDict.COUNT = item.countName || defaultContainer
  }

  return [{ ...countDict, ...containerDict }, weightDict, volumeDict] as Record<
    Unit,
    string
  >[]
}
