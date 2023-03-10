import { volumeUnits, weightUnits } from '../../../constants/units'
import { Unit } from '../../../constants/units'
import { convertFromVolumeToGrams } from './convertFromVolumeToGrams'
import { convertFromWeightToGrams } from './convertFromWeightToGrams'

type NullableNumber = number | null | undefined

export const convertToGrams = (
  amount: number,
  unit: Unit,
  countToGram: NullableNumber,
  tbspToGram: NullableNumber,
  countToTbsp: NullableNumber,
  servingPerContainer: NullableNumber
) => {
  const isVolume = volumeUnits.includes(unit)
  const isWeight = weightUnits.includes(unit)
  const isContainer = unit === 'CONTAINER'
  const isCount = unit === 'COUNT'

  if (isVolume && tbspToGram) {
    return convertFromVolumeToGrams(unit, amount, tbspToGram)
  } else if (isWeight) {
    return convertFromWeightToGrams(unit, amount)
  } else if (isContainer && countToGram && servingPerContainer) {
    return amount * servingPerContainer * countToGram
  } else if (isCount && countToTbsp && tbspToGram) {
    const tbsp = amount * countToTbsp
    return tbsp * tbspToGram
  } else if (isCount && countToGram) {
    return amount * countToGram
  } else {
    return amount
  }
}
