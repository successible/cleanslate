import { QuickAddUnit } from '../../../../constants/units'
import { handleError } from '../../../../helpers/handleError'
import { addQuickLogToCloud } from '../../../../helpers/log/addQuickLogToCloud'
import { deleteLogsOnCloud } from '../../../../helpers/log/deleteLogsOnCloud'
import { Log } from '../../../../models/log'

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
