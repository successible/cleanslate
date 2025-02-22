import type { Unit } from '../../../constants/units'

export const convertFromWeightToGrams = (
  unit: Unit,
  amount: number
): number => {
  if (unit === 'LBS') {
    return amount * 453
  }
  if (unit === 'OZ') {
    return (amount / 16) * 453
  }
  return amount
}
