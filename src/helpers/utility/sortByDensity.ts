import { Density, Food } from '../../models/Food/model'
import { Recipe } from '../../models/Recipes/model'
import { sortByCaloricDensity } from './sortByCaloricDensity'
import { sortByProteinDensity } from './sortByProteinDensity'

export const sortByDensity = (
  density: Density,
  items: Food[]
): (Food | Recipe)[] => {
  if (density === 'caloric-density') {
    return sortByCaloricDensity(items)
  } else if (density === 'protein-density') {
    return sortByProteinDensity(items)
  } else {
    throw Error('Something went wrong with sortRecipesByDensity')
  }
}
