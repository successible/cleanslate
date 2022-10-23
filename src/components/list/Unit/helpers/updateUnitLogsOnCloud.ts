import { handleError } from '../../../../helpers/data/handleError'
import { addQuickLogToCloud } from '../../../../models/Log/helpers/addQuickLogToCloud'
import { deleteLogsOnCloud } from '../../../../models/Log/helpers/deleteLogsOnCloud'
import { Log } from '../../../../models/Log/model'
import { QuickAddUnit } from '../../../../models/Log/types'

export const updateUnitLogsOnCloud = async (
  logs: Log[],
  amount: number,
  unit: QuickAddUnit,
  onSuccess: () => void
) => {
  try {
    const logsToDelete = logs
      .filter((log) => log.unit === unit)
      .map((log) => log.id)
    await deleteLogsOnCloud(logsToDelete, () => {})
    await addQuickLogToCloud({ objects: [{ amount, unit }] }, () => {})
    onSuccess()
  } catch (error) {
    handleError(error as Error)
  }
}
