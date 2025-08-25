import type { Food } from '../../../models/food'
import type { Recipe } from '../../../models/recipe'
import { createAllPossibleImageNames } from './createImageName'

// @ts-expect-error
export const getImagePath = require.context('../../../assets/foods', true)

/**
 * Check if an image exists on the client that matches the group and individual food name.
 * - If the individual image exists, return the Webpack URL corresponding to that image.
 * - If the group image exists, return the Webpack URL corresponding to that image .
 * - Otherwise, return an empty string.
 */
export const selectFoodImage = (
  model: Food | Recipe | null | undefined,
  getImagePath: (assetDir: string) => { default: string },
  extractSrc = true
) => {
  const defaultPath = ''
  if (!model) {
    return defaultPath
  }
  for (const name of createAllPossibleImageNames(model)) {
    try {
      const imagePath = getImagePath(`./${name}`)
      if (imagePath) {
        // @ts-expect-error
        return extractSrc ? imagePath.default.src : imagePath.default
      }
    } catch (_error) {
      // Do nothing
    }
  }
  return defaultPath
}
