import { prep } from '../../../../helpers/utility/prepareFractionalInputForSubmission'
import { VolumeUnit } from '../../../../models/Log/types'
import { mapTbspToOtherVolumeUnit } from '../../../macros/helpers/mapTbspToOtherVolumeUnit'
import { convertDecimalToFraction } from '../../../standard-editor/helpers/convertDecimalToFraction'

export const getAdjustedVolumeAmount = (
  countToGram: React.ReactText,
  volumeUnit: VolumeUnit
): React.ReactText => {
  const num = prep(countToGram)
  if (!num) {
    return countToGram
  } else if (volumeUnit === 'TBSP') {
    return convertDecimalToFraction(num)
  } else {
    return convertDecimalToFraction(mapTbspToOtherVolumeUnit(volumeUnit, num))
  }
}
