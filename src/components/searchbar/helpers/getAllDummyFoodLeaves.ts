import { DummyFoods } from '../constants/dummyFoods'

/** Recursively go through all dummy foods, getting the foods to remove, like turkey breast with skin */
export const getAllDummyFoodLeaves = (dummyFoods: DummyFoods): string[] => {
  const foodsToRemove = [] as string[]
  // The recursive function
  const recurse = (dummyFoods: DummyFoods) => {
    for (const value of Object.values(dummyFoods)) {
      // Guard: Make sure it is not a category
      if (Array.isArray(value)) {
        foodsToRemove.push(...(value as string[]))
      } else {
        recurse(value)
      }
    }
  }

  // Start the recursive function
  recurse(dummyFoods)
  return foodsToRemove
}
