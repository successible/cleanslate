import type { WeightUnit } from '../../../../constants/units'
import { convertToNumber } from '../../../../helpers/convertToNumber'
import { convertToImperialFromGrams } from '../../../macros/helpers/convertToImperialFromGrams'

export const getAdjustedWeightAmount = (
  countToGram: string | number,
  weightUnit: WeightUnit
): string | number => {
  const num = convertToNumber(countToGram)
  if (!num) {
    return countToGram
  }
  if (weightUnit === 'GRAM') {
    return num
  }
  const imperial = convertToImperialFromGrams(weightUnit, num)
  return imperial
}
