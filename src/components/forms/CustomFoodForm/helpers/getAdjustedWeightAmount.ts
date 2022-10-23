import { prep } from '../../../../helpers/utility/prepareFractionalInputForSubmission'
import { WeightUnit } from '../../../../models/Log/types'
import { convertToImperialFromGrams } from '../../../macros/helpers/convertToImperialFromGrams'
import { convertDecimalToFraction } from '../../../standard-editor/helpers/convertDecimalToFraction'

export const getAdjustedWeightAmount = (
  countToGram: React.ReactText,
  weightUnit: WeightUnit
): React.ReactText => {
  const num = prep(countToGram)
  if (!num) {
    return countToGram
  } else if (weightUnit === 'GRAM') {
    return convertDecimalToFraction(num)
  } else {
    return convertDecimalToFraction(convertToImperialFromGrams(weightUnit, num))
  }
}
