// We only want the search bar to render for dummy foods with one level and a ton of options
import { Food } from '../../../models/Food/model'
import { Recipe } from '../../../models/Recipes/model'

// Currently, that is just cheese, beef, dried fruit, and whole grains
export const isSearchableDummyFood = (dummyFood: Food | Recipe | null) =>
  dummyFood &&
  ['cheese', 'dried fruit', 'whole grain', 'flour', 'bean', 'pasta'].includes(
    dummyFood?.name.toLowerCase()
  )
