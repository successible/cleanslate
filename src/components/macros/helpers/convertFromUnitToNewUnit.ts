import { volumeUnits } from '../../../constants/units'
import type { Unit } from '../../../constants/units'
import { convertFromGrams } from './convertFromGrams'
import { convertToGrams } from './convertToGrams'
import { mapOtherVolumeUnitToTbsp } from './mapOtherVolumeUnitToTbsp'
import { mapTbspToOtherVolumeUnit } from './mapTbspToOtherVolumeUnit'

export const convertFromUnitToNewUnit = (
  oldAmount: number,
  oldUnit: Unit,
  newUnit: Unit,
  countToGram: number | null | undefined,
  tbspToGram: number | null | undefined,
  countToTbsp: number | null | undefined,
  servingPerContainer: number | null | undefined
) => {
  // The edge cases
  // In which we cannot convert from X to gram to X

  const volumeToVolume =
    volumeUnits.includes(oldUnit) && volumeUnits.includes(newUnit)
  const countToContainer = oldUnit === 'COUNT' && newUnit === 'CONTAINER'
  const containerToCount = oldUnit === 'CONTAINER' && newUnit === 'COUNT'
  const countToVolume = oldUnit === 'COUNT' && volumeUnits.includes(newUnit)
  const volumeToCount = volumeUnits.includes(oldUnit) && newUnit === 'COUNT'
  const containerToVolume =
    oldUnit === 'CONTAINER' && volumeUnits.includes(newUnit)
  const volumeToContainer =
    volumeUnits.includes(oldUnit) && newUnit === 'CONTAINER'

  if (volumeToVolume) {
    const tbsp = mapOtherVolumeUnitToTbsp(oldUnit, oldAmount)
    return mapTbspToOtherVolumeUnit(newUnit, tbsp)
  }
  if (countToContainer && servingPerContainer) {
    return oldAmount / servingPerContainer
  }
  if (containerToCount && servingPerContainer) {
    return oldAmount * servingPerContainer
  }
  if (countToVolume && countToTbsp) {
    const tbsp = oldAmount * countToTbsp
    return mapTbspToOtherVolumeUnit(newUnit, tbsp)
  }
  if (volumeToCount && countToTbsp) {
    const tbsp = mapOtherVolumeUnitToTbsp(oldUnit, oldAmount)
    return tbsp / countToTbsp
  }
  if (containerToVolume && countToTbsp && servingPerContainer) {
    const count = oldAmount * servingPerContainer
    const tbsp = count * countToTbsp
    return mapTbspToOtherVolumeUnit(newUnit, tbsp)
  }
  if (volumeToContainer && countToTbsp && servingPerContainer) {
    const tbsp = mapOtherVolumeUnitToTbsp(oldUnit, oldAmount)
    const count = tbsp / countToTbsp
    return count / servingPerContainer
  }
  const grams = convertToGrams(
    oldAmount,
    oldUnit,
    countToGram,
    tbspToGram,
    countToTbsp,
    servingPerContainer
  )

  // The happy path
  // In which we can convert from X to gram to X

  return convertFromGrams(
    grams,
    newUnit,
    countToGram,
    tbspToGram,
    servingPerContainer
  )
}
