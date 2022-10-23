import { quickAddUnits } from '../../../../models/Log/constants'
import { Log } from '../../../../models/Log/model'

export const getCount = (logs: Log[]) => {
  const units = quickAddUnits
  return logs.filter((log) => units.includes(log.unit)).length
}
