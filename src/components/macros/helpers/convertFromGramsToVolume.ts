import { Unit } from '../../../constants/units'
import { mapTbspToOtherVolumeUnit } from './mapTbspToOtherVolumeUnit'

export const convertFromGramsToVolume = (
  unit: Unit,
  grams: number,
  tbspToGram: number
): number => {
  const tbsp = grams / tbspToGram
  return mapTbspToOtherVolumeUnit(unit, tbsp)
}
