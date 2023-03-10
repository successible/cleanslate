import { quickAddUnits } from '../../../../constants/units'
import { QuickAddUnit } from '../../../../constants/units'
import { Log } from '../../../../models/log'

export type UnitLogs = Record<QuickAddUnit, Log[]>

export const getUnitLogs = (logs: Log[]): UnitLogs => {
  const units = quickAddUnits
  const unitLogs = logs.filter((log) => units.includes(log.unit))
  const calorieLogs = unitLogs.filter((log) => log.unit === 'CALORIE')
  const proteinLogs = unitLogs.filter((log) => log.unit === 'PROTEIN')
  const exerciseLogs = unitLogs.filter((log) => log.unit === 'EXERCISE')
  return {
    CALORIE: calorieLogs,
    EXERCISE: exerciseLogs,
    PROTEIN: proteinLogs,
  }
}
