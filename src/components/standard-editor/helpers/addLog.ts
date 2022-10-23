import { addLogToCloud } from '../../../models/Log/helpers/addLogToCloud'
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
    }

export const addLog = (
  dispatch: Dispatch<
    keyof DataEvents | keyof NavbarEvents | keyof EditorEvents
  >,
  alias: string | null,
  amount?: number | null,
  unit?: Unit | null,
  item?: string,
  type?: Type
) => {
  const itemObject = type === 'food' ? { food: item } : { recipe: item }
  const log = amount && unit && item && { amount, unit, ...itemObject, alias }
  if (typeof log !== 'string' && log) {
    dispatch('closeModal')
    dispatch('closeQuickAddModal')
    dispatch('clearEditor')
    addLogToCloud(log as AddLog, () => {})
  }
}
