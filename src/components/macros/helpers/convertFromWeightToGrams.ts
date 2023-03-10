import { Unit } from '../../../constants/units'

export const convertFromWeightToGrams = (
  unit: Unit,
  amount: number
): number => {
  if (unit === 'LBS') {
    return amount * 453
  } else if (unit === 'OZ') {
    return (amount / 16) * 453
  } else {
    return amount
  }
}
