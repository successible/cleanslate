import get from 'just-safe-get'
import { dummyFoods } from '../constants/dummyFoods'

/** Get the next level of a dummy food, either something like ["Breast", "Wing", "Thigh"] or ["Chicken breast (raw)", "Chicken breast (cooked)"] */
export const getNextLevel = (keys: string[]): string[] => {
  const nextLevel = get(dummyFoods, keys)
  if (Array.isArray(nextLevel)) {
    return nextLevel as string[]
  } else {
    return Object.keys(nextLevel)
  }
}
