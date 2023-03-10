import { Log } from '../../../../models/log'
import { getTotals } from './getTotals'
import { getUnitLogs } from './getUnitLogs'

export const getCombinedLogs = (logs: Log[]): Log[] => {
  const unitLogs = getUnitLogs(logs)
  const totals = getTotals(unitLogs)

  const calorie = new Log()
  calorie.amount = totals.CALORIE
  calorie.unit = 'CALORIE'

  const protein = new Log()
  protein.amount = totals.PROTEIN
  protein.unit = 'PROTEIN'

  const exercise = new Log()
  exercise.amount = totals.EXERCISE
  exercise.unit = 'EXERCISE'

  return [calorie, protein, exercise]
}
