import { Log } from '../../../models/log'
import { CommonItem } from '../types'

export const convertItemToLog = (
  item: CommonItem,
  amount?: number | null
): Log => {
  const log = new Log()

  log.type = 'log'
  log.logToFood = item.food
  log.logToRecipe = item.recipe

  if (amount) {
    log.amount = amount
  } else if (item.amount) {
    log.amount = item.amount
  }

  if (item.unit) {
    log.unit = item.unit
  }

  return log
}
