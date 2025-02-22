import type { AllEvents } from '../../../store/store'
import type { Dispatch } from '../../../store/types'
import type { CommonItem } from '../types'

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
  } else if (type === 'quick-log') {
    dispatch('openQuickLogEditModal', item)
  } else if (type === 'exercise-log') {
    dispatch('openExerciseModal', item)
  }
}
