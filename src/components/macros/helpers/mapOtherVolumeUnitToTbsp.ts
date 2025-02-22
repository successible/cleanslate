import type { Unit } from '../../../constants/units'
import { handleError } from '../../../helpers/handleError'

/** Given the TBSP, TSP, or CUP unit, converts the amount to the same amount in TBSP */
export const mapOtherVolumeUnitToTbsp = (
  unit: Unit,
  amount: number
): number => {
  if (unit === 'TBSP') {
    return amount
  }
  if (unit === 'TSP') {
    return amount / 3
  }
  if (unit === 'CUP') {
    return amount * 16
  }
  if (unit === 'mL') {
    return amount * 0.067628
  }
  return handleError('The unit entered is not a volume unit!')
}
