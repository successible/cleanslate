import type { VolumeUnit } from '../../../../constants/units'
import { prep } from '../../../../helpers/prepareFractionalInputForSubmission'
import { mapTbspToOtherVolumeUnit } from '../../../macros/helpers/mapTbspToOtherVolumeUnit'

export const getAdjustedVolumeAmount = (
  countToGram: string | number,
  volumeUnit: VolumeUnit
): string | number => {
  const num = prep(countToGram)
  if (!num) {
    return countToGram
  }
  if (volumeUnit === 'TBSP') {
    return num
  }
  return mapTbspToOtherVolumeUnit(volumeUnit, num)
}
