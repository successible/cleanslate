import { Unit } from '../../../models/Log/types'
import { mapOtherVolumeUnitToTbsp } from './mapOtherVolumeUnitToTbsp'

export const convertFromVolumeToGrams = (
  unit: Unit,
  amount: number,
  tbspToGram: number
): number => {
  const tbsp = mapOtherVolumeUnitToTbsp(unit, amount)
  return tbsp * tbspToGram
}
