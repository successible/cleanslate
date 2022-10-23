import { volumeUnits } from '../../../models/Log/constants'
import { Unit } from '../../../models/Log/types'
import { convertFromImperialToGrams } from './convertFromImperialToGrams'
import { convertFromVolumeToGrams } from './convertFromVolumeToGrams'

/** Given any unit and amount, convert to grams for each possible unit */
export const convertToGramsIfPossible = (
  amount: number,
  unit: Unit,
  countToGram: number | null | undefined,
  tbspToGram: number | null | undefined,
  servingPerContainer: number | null | undefined
) => {
  if (unit === 'GRAM') {
    return amount
  } else if (volumeUnits.includes(unit) && tbspToGram) {
    return convertFromVolumeToGrams(unit, amount, tbspToGram)
  } else if (unit === 'OZ' || unit === 'LBS') {
    return convertFromImperialToGrams(unit, amount)
  } else if (unit === 'CONTAINER' && countToGram && servingPerContainer) {
    return amount * servingPerContainer * countToGram
  } else if (unit === 'COUNT' && countToGram) {
    return amount * countToGram
  } else {
    return amount
  }
}
