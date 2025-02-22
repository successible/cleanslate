import type { Unit } from '../../../constants/units'
import { handleError } from '../../../helpers/handleError'

/** Convert TBSP to other volume units, like CUP and TSP */
export const mapTbspToOtherVolumeUnit = (unit: Unit, tbsp: number) => {
  if (unit === 'TBSP') {
    return tbsp
  }
  if (unit === 'TSP') {
    return tbsp * 3
  }
  if (unit === 'CUP') {
    return tbsp / 16
  }
  if (unit === 'mL') {
    return tbsp / 0.067628
  }
  return handleError('The unit entered is not a volume unit!')
}
