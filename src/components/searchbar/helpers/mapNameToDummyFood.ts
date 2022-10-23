import { DummyFoods, dummyFoods } from '../constants/dummyFoods'

/** The goal of this function is to take a food name, like chicken breast with skin, and match it to the
 * parent dummy food if it has one, in this case, chicken. If it does not have one, return null.
 */
export const mapNameToDummyFood = (name: string): string | null => {
  let matchedDummyFood: string | null = null

  // The recursive function
  const recurse = (dummyFoods: DummyFoods, dummyFood: string) => {
    for (const value of Object.values(dummyFoods)) {
      // Guard: Make sure it is not a category
      if (Array.isArray(value)) {
        // If the food name exists in the array of possible options, we have a match
        // For example, value will be ['Chicken breast without skin (raw)', 'Chicken breast without skin (cooked)']
        // That means value will include the query (dummyFood) 'Chicken breast without skin (raw)'
        // Thus, the function will return to Chicken
        // The only modification we need to make is to normalize case for both the value and dummyFood
        // Otherwise, searching searching say, Monterey jack as your query will not return find the Monterey Jack in values
        // Simply because in value the Jack in Monterey jack isn't capitalized in the query but is in the database!
        if (value.map((v) => v.toLowerCase()).includes(name.toLowerCase())) {
          matchedDummyFood = dummyFood
        }
      } else {
        recurse(value, dummyFood)
      }
    }
  }

  // Iterate through each dummy food: chicken, lettuce, whole grain...
  for (const dummyFood of Object.keys(dummyFoods)) {
    if (matchedDummyFood !== null) {
      break
    } else {
      recurse(dummyFoods[dummyFood] as DummyFoods, dummyFood)
    }
  }

  return matchedDummyFood
}
