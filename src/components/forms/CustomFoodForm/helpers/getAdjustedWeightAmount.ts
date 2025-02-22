import type { WeightUnit } from '../../../../constants/units'
import { prep } from '../../../../helpers/prepareFractionalInputForSubmission'
import { convertToImperialFromGrams } from '../../../macros/helpers/convertToImperialFromGrams'

export const getAdjustedWeightAmount = (
  countToGram: string | number,
  weightUnit: WeightUnit
): string | number => {
  const num = prep(countToGram)
  if (!num) {
    return countToGram
  }
  if (weightUnit === 'GRAM') {
    return num
  }
  const imperial = convertToImperialFromGrams(weightUnit, num)
  return imperial
}
