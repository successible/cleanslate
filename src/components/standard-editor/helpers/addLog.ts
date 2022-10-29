import { addLogToCloud } from '../../../models/Log/helpers/addLogToCloud'
import { Barcode } from '../../../models/Log/model'
import { Unit } from '../../../models/Log/types'
import { DataEvents, Type } from '../../../store/data/types'
import { EditorEvents } from '../../../store/editor/types'
import { NavbarEvents } from '../../../store/navbar/types'
import { Dispatch } from '../../../store/types'

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
  dispatch: Dispatch<
    keyof DataEvents | keyof NavbarEvents | keyof EditorEvents
  >,
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
