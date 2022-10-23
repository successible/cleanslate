import { handleError } from '../../../helpers/data/handleError'
import {
  countUnits,
  imperialUnits,
  volumeUnits,
  weightUnits,
} from '../../../models/Log/constants'
import { Unit } from '../../../models/Log/types'
import { convertFromGramsToCount } from './convertFromGramsToCount'
import { convertFromVolumeUsingCountToGram } from './convertFromVolumeUsingCountToGram'
import { convertFromVolumeUsingCountToTbsp } from './convertFromVolumeUsingCountToTbsp'
import { convertToGramsIfPossible } from './convertToGramsIfPossible'
import { convertToImperialFromGrams } from './convertToImperialFromGrams'
import { convertToVolumeUsingCountToGram } from './convertToVolumeUsingCountToGram'
import { convertToVolumeUsingCountToTbsp } from './convertToVolumeUsingCountToTbsp'
import { convertToVolumeUsingTbspToGram } from './convertToVolumeUsingTbspToGram'
import { mapOtherVolumeUnitToTbsp } from './mapOtherVolumeUnitToTbsp'
import { mapTbspToOtherVolumeUnit } from './mapTbspToOtherVolumeUnit'

export const convertAmount = (
  oldAmount: number,
  oldUnit: Unit,
  newUnit: Unit,
  countToGram: number | null | undefined,
  tbspToGram: number | null | undefined,
  countToTbsp: number | null | undefined,
  servingPerContainer: number | null | undefined
) => {
  const grams = convertToGramsIfPossible(
    oldAmount,
    oldUnit,
    countToGram,
    tbspToGram,
    servingPerContainer
  )
  // Weird stuff can happen if you try to convert to the same unit, so don't bother
  if (newUnit === oldUnit) {
    return oldAmount
  } else if (
    countUnits.includes(newUnit) &&
    countUnits.includes(oldUnit) &&
    servingPerContainer
  ) {
    // This is for a VERY specific scenario
    // The only two units in play are COUNT and CONTAINER and neither a volume unit or a gram unit has been specified
    // In this case, we can simply convert between them and "pretend" they are grams
    if (newUnit === 'CONTAINER' && oldUnit === 'COUNT') {
      return oldAmount / servingPerContainer
    } else if (newUnit === 'COUNT' && oldUnit === 'CONTAINER') {
      return oldAmount * servingPerContainer
    } else {
      return handleError('Something went wrong with convertFromGrams')
    }
  } else if (
    weightUnits.includes(newUnit) &&
    volumeUnits.includes(oldUnit) &&
    countToGram &&
    countToTbsp
  ) {
    // Volume -> OZ/GRAM/LB for custom foods
    return convertFromVolumeUsingCountToGram(
      oldUnit,
      newUnit,
      oldAmount,
      countToGram,
      countToTbsp
    )
  } else if (
    volumeUnits.includes(newUnit) &&
    weightUnits.includes(oldUnit) &&
    countToGram &&
    countToTbsp
  ) {
    // OZ/GRAM/LB -> Volume for custom foods
    return convertToVolumeUsingCountToGram(
      newUnit,
      grams,
      countToGram,
      countToTbsp,
      servingPerContainer
    )
  } else if (volumeUnits.includes(newUnit) && tbspToGram) {
    return convertToVolumeUsingTbspToGram(newUnit, grams, tbspToGram)
  } else if (
    // Count -> Volume by countToTbsp
    volumeUnits.includes(newUnit) &&
    countUnits.includes(oldUnit) &&
    countToTbsp
  ) {
    return convertToVolumeUsingCountToTbsp(
      newUnit,
      oldUnit,
      oldAmount,
      countToTbsp,
      servingPerContainer
    )
  } else if (
    // Volume  -> Count by countToTbsp
    countUnits.includes(newUnit) &&
    volumeUnits.includes(oldUnit) &&
    countToTbsp
  ) {
    return convertFromVolumeUsingCountToTbsp(
      newUnit,
      oldUnit,
      oldAmount,
      countToTbsp,
      servingPerContainer
    )
  } else if (countUnits.includes(newUnit) && countToGram) {
    return convertFromGramsToCount(
      grams,
      newUnit,
      countToGram,
      servingPerContainer
    )
  } else if (volumeUnits.includes(newUnit) && volumeUnits.includes(oldUnit)) {
    // TBSP -> TSP and TSP -> TBSP. In other words, pure volume changes
    if (newUnit === 'TBSP') {
      return mapOtherVolumeUnitToTbsp(oldUnit, oldAmount)
    } else {
      return mapTbspToOtherVolumeUnit(newUnit, oldAmount)
    }
  } else if (imperialUnits.includes(newUnit)) {
    return convertToImperialFromGrams(newUnit, grams)
  } else if (newUnit === 'GRAM') {
    return Math.round(grams)
  } else {
    return handleError('Something went wrong with convertFromGrams')
  }
}
