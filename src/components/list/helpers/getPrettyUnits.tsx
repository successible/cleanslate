import {
  defaultContainer,
  volumeUnits,
  weightUnits,
} from '../../../constants/units'
import { type Unit, defaultCount } from '../../../constants/units'
import { zipObject } from '../../../helpers/zipObject'
import type { Food } from '../../../models/food'
import type { Recipe } from '../../../models/recipe'

/**
 * Given the all possible units, it slims and prettifies those units for each food item or dictionary.
 * Ultimately, this function creates a dictionary of defaultUnit:prettyUnit. In most cases, the prettyUnit and defaultUnit are identical!
 * Thus, the dictionary looks like this.
 * {TBSP: "TBSP", "GRAM": "GRAM", "COUNT": "COUNT"}, etc.
 * - If the food item does NOT have values for countName or volume (i.e. TBSP) in the database, those key:value pairs are removed
 * - If the food item has a "pretty" name for count (i.e. onion), the default value of "COUNT" is replaced with the prettyName
 */

export const getPrettyUnits = (item: Food | Recipe) => {
  const volume =
    (item.type === 'food' && (item?.countToTbsp || item?.tbspToGram)) ||
    (item.type === 'recipe' && item?.countToTbsp)
      ? volumeUnits
      : []

  const volumeDict = zipObject(volume, volume)

  const weight =
    (item.type === 'food' && (item.caloriesPerGram || item.countToGram)) ||
    (item.type === 'recipe' && item.countToGram)
      ? weightUnits
      : []

  const weightDict = zipObject(weight, weight)

  const count =
    item.type === 'recipe' ||
    (item.type === 'food' && item?.countName) ||
    (item.type === 'food' &&
      (item.caloriesPerCount || item.caloriesPerCount === 0) &&
      (item.proteinPerCount || item.proteinPerCount === 0))
      ? ['COUNT']
      : []

  const container =
    (item.type === 'food' &&
      (item.caloriesPerCount || item.caloriesPerCount === 0) &&
      (item.proteinPerCount || item.proteinPerCount === 0) &&
      item.servingPerContainer) ||
    (item.type === 'recipe' &&
      item.servingPerContainer &&
      item.servingPerContainer !== 0)
      ? ['CONTAINER']
      : []

  const countDict = {
    ...zipObject(container, container),
    ...zipObject(count, count),
  }

  if (countDict.COUNT && !countDict.CONTAINER) {
    countDict.COUNT = item.countName || defaultCount
  } else if (countDict.COUNT && countDict.CONTAINER) {
    countDict.COUNT = defaultCount
    countDict.CONTAINER = item.countName || defaultContainer
  }

  return [countDict, weightDict, volumeDict] as Record<Unit, string>[]
}
