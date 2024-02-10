import { QuickAddUnit } from '../../constants/units'
import { Log } from '../../models/log'
import { handleError } from '../handleError'
import { deleteLogsOnCloud } from '../log/deleteLogsOnCloud'
import { addQuickLogToCloud } from './addQuickLogToCloud'

export const updateUnitLogsOnCloud = async (
  logs: Log[],
  amount: number,
  unit: QuickAddUnit,
  enablePlanning: boolean,
  onSuccess: () => void
) => {
  try {
    const logsToDelete = logs
      .filter((log) => log.unit === unit)
      .map((log) => log.id)
    await deleteLogsOnCloud(logsToDelete, () => {})
    await addQuickLogToCloud(
      { objects: [{ amount, unit }] },
      enablePlanning,
      () => {}
    )
    onSuccess()
  } catch (error) {
    handleError(error as Error)
  }
}
