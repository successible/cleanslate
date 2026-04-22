import type { VolumeUnit } from '../../../../constants/units'
import { convertToNumber} from '../../../../helpers/convertToNumber'
import { mapTbspToOtherVolumeUnit } from '../../../macros/helpers/mapTbspToOtherVolumeUnit'

export const getAdjustedVolumeAmount = (
  countToGram: string | number,
  volumeUnit: VolumeUnit
): string | number => {
  const num = convertToNumber(countToGram)
  if (!num) {
    return countToGram
  }
  if (volumeUnit === 'TBSP') {
    return num
  }
  return mapTbspToOtherVolumeUnit(volumeUnit, num)
}
