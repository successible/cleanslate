import type { Unit } from '../../../constants/units'

export const convertFromGramsToWeight = (unit: Unit, grams: number): number => {
  if (unit === 'LBS') {
    return grams / 453
  }
  if (unit === 'OZ') {
    return (grams / 453) * 16
  }
  return grams
}
