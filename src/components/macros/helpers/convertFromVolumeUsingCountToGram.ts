import { imperialUnits } from '../../../models/Log/constants'
import { Unit } from '../../../models/Log/types'
import { convertToImperialFromGrams } from './convertToImperialFromGrams'
import { mapOtherVolumeUnitToTbsp } from './mapOtherVolumeUnitToTbsp'

export const convertFromVolumeUsingCountToGram = (
  oldUnit: Unit,
  newUnit: Unit,
  amount: number,
  countToGram: number,
  countToTbsp: number
): number => {
  const tbsp = mapOtherVolumeUnitToTbsp(oldUnit, amount)
  const count = tbsp / countToTbsp
  const grams = count * countToGram
  if (imperialUnits.includes(newUnit)) {
    return convertToImperialFromGrams(newUnit, grams)
  } else {
    return grams
  }
}
