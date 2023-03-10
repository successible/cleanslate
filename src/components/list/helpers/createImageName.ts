import { Food } from '../../../models/food'
import { Recipe } from '../../../models/recipe'
import { formatAsImagePath } from './formatAsImagePath'

/** Given the name of the food/recipe, returns the plural and singular form of the word as all lower case.
 * .svg is also appended to the name
 */
export const createImageName = (name: string, extension: boolean) => {
  const imageName = formatAsImagePath(name)
  if (extension) {
    return `${imageName}.svg`
  } else {
    return imageName
  }
}

/** Given the name of the food, category, and the group it belongs to, return all possible names of the images.
 * For example: [tomato.svg, vegetables.svg, vegetable.svg]
 */
export const createAllPossibleImageNames = (model: Food | Recipe) => {
  return [
    createImageName(model.name, true),
    createImageName(model.type === 'food' ? model.category : 'Recipe', true),
    createImageName(model.type === 'food' ? model.group : 'Custom', true),
  ]
}
