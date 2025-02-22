import type { Unit } from '../../../constants/units'
import type { Ingredient } from '../../../models/ingredient'
import type { Log } from '../../../models/log'
import { convertFromUnitToNewUnit } from './convertFromUnitToNewUnit'

/** Given an amount in grams, convert that amount to match the unit passed into the function.
 *
 * For example, convert 450g and the new unit of count, convert the amount to 2.
 */
export const getAmountFromNewUnit = (
  item: Log | Ingredient,
  oldAmount: number,
  oldUnit: Unit,
  newUnit: Unit
): number => {
  // Conversion factors
  const countToGram =
    item.type === 'log'
      ? item.logToFood?.countToGram
      : item?.ingredientToFood?.countToGram
  const tbspToGram =
    item.type === 'log'
      ? item.logToFood?.tbspToGram
      : item?.ingredientToFood?.tbspToGram
  const countToTbsp =
    item.type === 'log'
      ? item.logToFood?.countToTbsp
      : item?.ingredientToFood?.countToTbsp
  const servingPerContainer =
    item.type === 'log'
      ? item.logToFood?.servingPerContainer
      : item?.ingredientToFood?.servingPerContainer

  const newAmount = convertFromUnitToNewUnit(
    oldAmount,
    oldUnit,
    newUnit,
    countToGram,
    tbspToGram,
    countToTbsp,
    servingPerContainer
  )

  return newAmount
}
