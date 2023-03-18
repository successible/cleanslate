import { Unit } from '../../../constants/units'
import { addLogToCloud } from '../../../helpers/log/addLogToCloud'
import { Barcode, Meal } from '../../../models/log'
import { Type } from '../../../store/data/types'
import { Dispatch } from '../../../store/store'

export type AddLog = {
  alias: string | null
  amount: number
  barcode: Barcode | null
  basicFood: string | undefined
  consumed: boolean
  food: string | undefined
  meal: Meal
  recipe: string | undefined
  unit: Unit
}

export const addLog = (
  dispatch: Dispatch,
  alias: string | null,
  amount: number | null,
  unit: Unit | null,
  barcode: Barcode | null,
  enablePlanning: boolean,
  meal: Meal,
  type: Type,
  isCustomFood: boolean,
  id: string | undefined
) => {
  if (amount && unit) {
    const log: AddLog = {
      alias,
      amount,
      barcode,
      basicFood: type === 'food' && !isCustomFood ? id : undefined,
      consumed: !enablePlanning,
      food: type === 'food' && isCustomFood ? id : undefined,
      meal,
      recipe: type === 'recipe' ? id : undefined,
      unit,
    }
    dispatch('closeModal')
    dispatch('closeQuickAddModal')
    dispatch('clearEditor')
    dispatch('closeCameraModal')
    addLogToCloud(log, () => {})
  }
}
