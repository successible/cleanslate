import { QuickAddUnit } from '../../../../constants/units'
import { UnitLogs } from './getUnitLogs'

export type UnitTotals = Record<QuickAddUnit, number>
export const getTotals = (unitLogs: UnitLogs): UnitTotals => {
  return {
    CALORIE: unitLogs.CALORIE.reduce((accumulator, log) => {
      return log.amount + accumulator
    }, 0),
    EXERCISE: unitLogs.EXERCISE.reduce((accumulator, log) => {
      return log.amount + accumulator
    }, 0),
    PROTEIN: unitLogs.PROTEIN.reduce((accumulator, log) => {
      return log.amount + accumulator
    }, 0),
  }
}
