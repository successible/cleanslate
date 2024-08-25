import { toast } from 'react-toastify';
import { Unit } from '../../../constants/units'
import { addFoodToCloud } from '../../../helpers/Food/addFoodToCloud'
import { addIngredient } from '../../../helpers/ingredient/addIngredient'
import { Food } from '../../../models/food'
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
  searchResult?: SelectedItem,
  customFoodToCreate?: Food
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

  if (type === 'ingredient') {
    const ingredient = addIngredient(
      searchResult,
      barcode,
      amount,
      unit,
      typeof basicFoodId === 'string' ? basicFoodId : null
    )
    dispatch('saveIngredient', ingredient)
    return true
  }

  if (customFoodToCreate && type === 'log') {
    addFoodToCloud(
      {
        caloriesPerCount: customFoodToCreate?.caloriesPerCount,
        category: 'Food',
        containerName: 'Container',
        countName: 'Serving',
        countToGram: customFoodToCreate?.countToGram,
        countToTbsp: customFoodToCreate?.countToTbsp,
        group: 'Custom',
        name: customFoodToCreate.name,
        preferredVolumeUnit: 'TBSP',
        preferredWeightUnit: 'GRAM',
        proteinPerCount: customFoodToCreate?.proteinPerCount,
        servingPerContainer: customFoodToCreate?.servingPerContainer,
      },
      (id) => {
        toast.success(`Created the ${customFoodToCreate.name} custom food!`)
        addLog(
          dispatch,
          alias,
          amount,
          unit,
          null,
          enablePlanning,
          meal,
          'food',
          false,
          id
        )
        return true
      }
    )
    return true
  }

  if (type === 'log' && !customFoodToCreate) {
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
