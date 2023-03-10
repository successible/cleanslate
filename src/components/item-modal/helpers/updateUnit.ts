import { Unit } from '../../../constants/units'
import { prep } from '../../../helpers/prepareFractionalInputForSubmission'
import { round } from '../../../helpers/round'
import { convertItemToIngredient } from '../../item/helpers/convertItemToIngredient'
import { convertItemToLog } from '../../item/helpers/convertItemToLog'
import { CommonItem } from '../../item/types'
import { getAmountFromNewUnit } from '../../macros/helpers/getAmountFromNewUnit'

export const updateUnit = (
  item: CommonItem,
  localAmount: string,
  localUnit: Unit,
  newUnit: Unit
) => {
  const { amount, type } = item

  // If the type is not log it must be ingredient
  const element =
    type === 'log'
      ? convertItemToLog(item, amount)
      : convertItemToIngredient(item, amount)

  const newAmount = getAmountFromNewUnit(
    element,
    prep(localAmount) || element.amount,
    localUnit,
    newUnit
  )
  return { newAmount: String(round(newAmount, 8)), newUnit: newUnit }
}
