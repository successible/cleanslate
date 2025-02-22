import type { Unit } from '../../../constants/units'

export const convertFromGramsToCount = (
  grams: number,
  newUnit: Unit,
  countToGrams: number,
  servingPerContainer: number | null | undefined
): number => {
  const count = grams / countToGrams
  const countToUse =
    servingPerContainer && newUnit === 'CONTAINER'
      ? count / servingPerContainer
      : count
  return countToUse
}
