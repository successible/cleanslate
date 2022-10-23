import { Unit } from '../../../models/Log/types'
import { mapOtherVolumeUnitToTbsp } from './mapOtherVolumeUnitToTbsp'

export const convertFromVolumeUsingCountToTbsp = (
  newUnit: Unit,
  oldUnit: Unit,
  amount: number,
  countToTbsp: number,
  servingPerContainer: number | null | undefined
): number => {
  const tbsp = mapOtherVolumeUnitToTbsp(oldUnit, amount)
  const count = tbsp / countToTbsp
  const countToUse =
    servingPerContainer && newUnit === 'CONTAINER'
      ? count / servingPerContainer
      : count
  return countToUse
}
