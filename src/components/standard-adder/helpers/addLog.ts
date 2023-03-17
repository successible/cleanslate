import { Unit } from '../../../constants/units'
import { addLogToCloud } from '../../../helpers/log/addLogToCloud'
import { Barcode, Meal } from '../../../models/log'
import { Type } from '../../../store/data/types'
import { Dispatch } from '../../../store/store'

type SharedFields = {
  alias: string | null
  amount: number
  consumed: boolean
  meal: Meal
  unit: Unit
}

export type AddLog =
  | ({
      food: string | undefined
      recipe?: undefined
    } & SharedFields)
  | ({
      food?: undefined
      recipe: string | undefined
    } & SharedFields)

export const addLog = (
  dispatch: Dispatch,
  alias: string | null,
  amount: number | null,
  unit: Unit | null,
  barcode: Barcode | null,
  enablePlanning: boolean,
  meal: Meal,
  type: Type,
  id: string | undefined
) => {
  const fieldsPresent = Boolean(amount && unit && (id || barcode))
  const log = fieldsPresent && {
    amount,
    unit,
    ...(type === 'food' ? { barcode, food: id } : { recipe: id }),
    alias,
    consumed: !enablePlanning,
    meal,
  }

  if (log) {
    dispatch('closeModal')
    dispatch('closeQuickAddModal')
    dispatch('clearEditor')
    dispatch('closeCameraModal')
    addLogToCloud(log as AddLog, () => {})
  }
}
