import { quickAddUnits } from '../../../../constants/units'
import { Log } from '../../../../models/log'

export const getCount = (logs: Log[]) => {
  const units = quickAddUnits
  return logs.filter((log) => units.includes(log.unit)).length
}
