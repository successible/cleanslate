import {
  type DummyFoods,
  dummyFoods,
} from '../../../constants/dummyFoods/dummyFoods'
import { capitalize } from '../../../helpers/capitalize'
import type { Path } from './getDummyFoodPath'

export const getDummyFoodTree = (
  path: Path
): { root: string; tree: DummyFoods } => {
  const root = capitalize(path.stem[0])
  const tree = dummyFoods[root] as DummyFoods
  return { root, tree }
}
