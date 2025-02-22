import { volumeUnits, weightUnits } from '../../../constants/units'
import type { Unit } from '../../../constants/units'
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
  }
  if (isWeight) {
    return convertFromWeightToGrams(unit, amount)
  }
  if (isContainer && countToGram && servingPerContainer) {
    return amount * servingPerContainer * countToGram
  }
  if (isCount && countToTbsp && tbspToGram) {
    const tbsp = amount * countToTbsp
    return tbsp * tbspToGram
  }
  if (isCount && countToGram) {
    return amount * countToGram
  }
  return amount
}
