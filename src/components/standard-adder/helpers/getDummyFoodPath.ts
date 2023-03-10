import traverse from 'traverse'
import { dummyFoods } from '../../../constants/dummyFoods/dummyFoods'
import { isDummyFood } from './isDummyFood'

export type Path = { stem: string[]; leaf: string }

export const removeParens = (s: string) => s.replace(')', '').replace('(', '')

export const getDummyFoodPath = (name: string): Path | null => {
  const paths = [] as Path[]
  if (isDummyFood(name)) {
    // eslint-disable-next-line array-callback-return
    traverse(dummyFoods).reduce(function (acc, x) {
      // Working through each leaf, if the leaf matches the name of the dummy food
      if (name && name === x) {
        // Should return ["Chicken", "Breast", "without skin"]
        const stem = this.path.slice(0, -1).map((p) => p.toLowerCase())
        // It does not include "leaf"
        // In this case, that is (raw)
        // This must be assemble manually (below)
        // Assembling the leaf
        const leaf = removeParens(name).toLowerCase().split(' ').slice(-1)[0]
        // Remove duplicates, in case the leaf is also contained in the path
        paths.push({ leaf, stem })
      }
    }, [])
    return paths[0]
  }
  return null
}
