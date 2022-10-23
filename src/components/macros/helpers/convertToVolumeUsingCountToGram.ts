import { Unit } from '../../../models/Log/types'
import { convertToVolumeUsingCountToTbsp } from './convertToVolumeUsingCountToTbsp'

export const convertToVolumeUsingCountToGram = (
  newUnit: Unit,
  grams: number,
  countToGram: number,
  countToTbsp: number,
  servingPerContainer: number | null | undefined
): number => {
  const count = grams / countToGram
  return convertToVolumeUsingCountToTbsp(
    newUnit,
    'COUNT',
    count,
    countToTbsp,
    servingPerContainer
  )
}
