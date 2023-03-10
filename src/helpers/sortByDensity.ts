import { Density, Food } from '../models/food'
import { Recipe } from '../models/recipe'
import { sortByCaloricDensity } from './sortByCaloricDensity'
import { sortByCombinedDensity } from './sortByCombinedDensity'
import { sortByProteinDensity } from './sortByProteinDensity'

export const sortByDensity = (
  density: Density,
  items: Food[]
): (Food | Recipe)[] => {
  if (density === 'caloric-density') {
    return sortByCaloricDensity(items)
  } else if (density === 'protein-density') {
    return sortByProteinDensity(items)
  } else if (density === 'combined-density') {
    return sortByCombinedDensity(items)
  } else {
    throw Error(
      `Error: sortRecipesByDensity: ${JSON.stringify({ density, items })}`
    )
  }
}
