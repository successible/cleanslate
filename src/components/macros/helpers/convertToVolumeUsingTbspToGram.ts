import { Unit } from '../../../models/Log/types'
import { mapTbspToOtherVolumeUnit } from './mapTbspToOtherVolumeUnit'

export const convertToVolumeUsingTbspToGram = (
  unit: Unit,
  grams: number,
  tbspToGram: number
): number => {
  const tbsp = grams / tbspToGram
  return mapTbspToOtherVolumeUnit(unit, tbsp)
}
