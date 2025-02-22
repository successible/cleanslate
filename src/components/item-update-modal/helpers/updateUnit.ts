import type { Unit } from '../../../constants/units'
import { prep } from '../../../helpers/prepareFractionalInputForSubmission'
import { convertItemToIngredient } from '../../item/helpers/convertItemToIngredient'
import { convertItemToLog } from '../../item/helpers/convertItemToLog'
import type { CommonItem } from '../../item/types'
import { getAmountFromNewUnit } from '../../macros/helpers/getAmountFromNewUnit'

export const updateUnit = (
  item: CommonItem,
  localAmount: string,
  localUnit: Unit,
  newUnit: Unit,
  convertBetweenUnits: boolean
) => {
  const { amount, type } = item

  // If the type is not log it must be ingredient
  const element =
    type === 'log'
      ? convertItemToLog(item, amount)
      : convertItemToIngredient(item, amount)

  const newAmount = convertBetweenUnits
    ? getAmountFromNewUnit(
        element,
        prep(localAmount) || element.amount,
        localUnit,
        newUnit
      )
    : prep(localAmount) || element.amount

  return { newAmount: String(newAmount), newUnit: newUnit }
}
