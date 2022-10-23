import { DummyFoods, dummyFoods } from '../constants/dummyFoods'
import { getAllDummyFoodLeaves } from './getAllDummyFoodLeaves'

export const isDummyFood = (name: string, subset?: string) => {
  return getAllDummyFoodLeaves(
    subset ? (dummyFoods[subset] as DummyFoods) : dummyFoods
  ).includes(name || '')
}
