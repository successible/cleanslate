import { Unit } from '../../../models/Log/types'
import { mapTbspToOtherVolumeUnit } from './mapTbspToOtherVolumeUnit'

export const convertToVolumeUsingCountToTbsp = (
  newUnit: Unit,
  oldUnit: Unit,
  count: number,
  countToTbsp: number,
  servingPerContainer: number | null | undefined
): number => {
  const countToUse =
    servingPerContainer && oldUnit === 'CONTAINER'
      ? count * servingPerContainer
      : count
  const tbsp = countToUse * countToTbsp
  return mapTbspToOtherVolumeUnit(newUnit, tbsp)
}
