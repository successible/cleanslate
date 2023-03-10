import { DummyFoods } from '../../../constants/dummyFoods/dummyFoods'

/** Recursively go through all dummy foods, getting the foods to remove, like turkey breast with skin */
export const getAllDummyFoodLeaves = (
  dummyFoods: DummyFoods
): Record<string, string> => {
  const leaves = {} as Record<string, string>
  // The recursive function
  const recurse = (dummyFoods: DummyFoods, path: string[] = []) => {
    for (const [key, value] of Object.entries(dummyFoods)) {
      // Guard: Make sure it is not a category
      if (Array.isArray(value)) {
        leaves[value[0]] = path[0]
      } else {
        recurse(value, [...path, key])
      }
    }
  }

  // Start the recursive function
  recurse(dummyFoods)
  return leaves
}
