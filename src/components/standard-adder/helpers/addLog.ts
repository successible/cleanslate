import { Unit } from '../../../constants/units'
import { addLogToCloud } from '../../../helpers/log/addLogToCloud'
import { Barcode } from '../../../models/log'
import { Type } from '../../../store/data/types'

import { Dispatch } from '../../../store/store'

export type AddLog =
  | {
      alias: string | null
      food: string | undefined
      recipe?: undefined
      amount: number
      unit: Unit
    }
  | {
      alias: string | null
      recipe: string | undefined
      food?: undefined
      amount: number
      unit: Unit
      barcode: Barcode | null
    }

export const addLog = (
  dispatch: Dispatch,
  alias: string | null,
  amount?: number | null,
  unit?: Unit | null,
  barcode?: Barcode | null,
  item?: string,
  type?: Type
) => {
  const itemObject =
    type === 'food' ? { barcode, food: item } : { recipe: item }
  const log = amount &&
    unit &&
    (item || barcode) && { amount, unit, ...itemObject, alias }
  if (typeof log !== 'string' && log) {
    dispatch('closeModal')
    dispatch('closeQuickAddModal')
    dispatch('clearEditor')
    dispatch('closeCameraModal')
    addLogToCloud(log as AddLog, () => {})
  }
}
