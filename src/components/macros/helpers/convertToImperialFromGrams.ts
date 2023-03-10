import { Unit } from '../../../constants/units'
import { handleError } from '../../../helpers/handleError'

export const convertToImperialFromGrams = (
  unit: Unit,
  amountInGrams: number
): number => {
  if (unit === 'LBS') {
    return amountInGrams / 453
  } else if (unit === 'OZ') {
    return (amountInGrams / 453) * 16
  } else {
    return handleError('The unit entered is not OZ or LBS!')
  }
}
