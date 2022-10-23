import { handleError } from '../../../helpers/data/handleError'
import { Unit } from '../../../models/Log/types'

/** Convert TBSP to other volume units, like CUP and TSP */
export const mapTbspToOtherVolumeUnit = (unit: Unit, tbsp: number) => {
  if (unit === 'TBSP') {
    return tbsp
  } else if (unit === 'TSP') {
    return tbsp * 3
  } else if (unit === 'CUP') {
    return tbsp / 16
  } else {
    return handleError('The unit entered is not a volume unit!')
  }
}
