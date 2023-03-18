import toast from 'react-hot-toast'
import { Unit } from '../../../constants/units'
import { addIngredient } from '../../../helpers/ingredient/addIngredient'
import { Barcode, Meal } from '../../../models/log'
import { SelectedItem } from '../../../store/editor/types'
import { Dispatch } from '../../../store/store'
import { AdderItem } from '../StandardAdder'
import { addLog } from './addLog'

export const submitEditor = (
  type: AdderItem,
  alias: string | null,
  amount: number | null,
  unit: Unit | null,
  barcode: Barcode | null,
  enablePlanning: boolean,
  meal: Meal,
  dispatch: Dispatch,
  searchResult?: SelectedItem
) => {
  const basicFoodId =
    searchResult && searchResult.type === 'food' && searchResult.basicFoodId

  if (!amount) {
    toast.error('Please specify a valid amount')
    return false
  }

  if (!unit) {
    toast.error('Please specify a valid unit')
    return false
  }

  if (!searchResult && !barcode) {
    toast.error('Please specify a valid food or recipe')
    return false
  }

  if (type === 'ingredient' && !searchResult) {
    toast.error('Please specify a valid food or recipe')
    return false
  }

  if (type === 'ingredient' && searchResult) {
    const ingredient = addIngredient(
      searchResult,
      amount,
      unit,
      typeof basicFoodId === 'string' ? basicFoodId : null
    )
    dispatch('saveIngredient', ingredient)
    return true
  }

  if (type === 'log') {
    const id = searchResult ? searchResult.id : undefined
    const type = searchResult ? searchResult.type : 'food'
    addLog(
      dispatch,
      alias,
      amount,
      unit,
      barcode,
      enablePlanning,
      meal,
      type,
      Boolean(basicFoodId),
      id
    )
    return true
  }

  return false
}
