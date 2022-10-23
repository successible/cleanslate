import { handleError } from '../../../helpers/data/handleError'
import { WeightUnit } from '../../../models/Log/types'

export const convertFromImperialToGrams = (
  unit: WeightUnit,
  amount: number
): number => {
  if (unit === 'GRAM') {
    return amount
  } else if (unit === 'LBS') {
    return amount * 453
  } else if (unit === 'OZ') {
    return (amount / 16) * 453
  } else {
    return handleError('The unit entered is not OZ or LBS!')
  }
}
