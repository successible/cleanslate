import { AllEvents } from '../../../store/store'
import { Dispatch } from '../../../store/types'
import { CommonItem } from '../types'

export const spawnInstanceEditModal = (
  item: CommonItem,
  dispatch: Dispatch<AllEvents>
) => {
  const { id, type } = item
  if (type === 'food') {
    dispatch('setFoodToUpdate', id)
    dispatch('openFoodFormModal')
  } else if (type === 'recipe') {
    dispatch('openRecipeFormModal', id)
  } else if (type === 'log' || type === 'ingredient') {
    dispatch('openItemModal', item)
  } else if (type === 'unit') {
    dispatch('openUnitModal', item)
  }
}
