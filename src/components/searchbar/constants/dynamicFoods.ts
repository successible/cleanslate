import { createDummyFood } from '../helpers/createDummyFood'
import { getAllDummyFoodLeaves } from '../helpers/getAllDummyFoodLeaves'
import { pasta } from './pasta'

// Basically, this adds every name of a dynamically created food to the list of foods so that they show up in search.
// This is only necessary because we never added those foods to the actual database to limit the number of rows.
export const dynamicFoods = [
  // Gather up every leaf, like "Whole wheat pasta [Angel hair]"
  ...getAllDummyFoodLeaves(pasta).map((name) =>
    // And create the relevant dummy foods!
    createDummyFood(name, 'Grain', 'Pasta')
  ),
]
