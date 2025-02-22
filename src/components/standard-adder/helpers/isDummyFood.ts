import {
  type DummyFoods,
  dummyFoods,
} from '../../../constants/dummyFoods/dummyFoods'
import { getAllDummyFoodLeaves } from './getAllDummyFoodLeaves'

export const isDummyFood = (name: string, subset?: string) => {
  const leaves = getAllDummyFoodLeaves(
    subset ? (dummyFoods[subset] as DummyFoods) : dummyFoods
  )
  return name in leaves
}
