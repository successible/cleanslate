import type { AllEvents } from '../../../store/store'
import type { Dispatch } from '../../../store/types'
import type { CommonItem } from '../types'

export const spawnItemEditModal = (
  item: CommonItem,
  dispatch: Dispatch<AllEvents>
) => {
  const { food, recipe, type } = item
  if (type === 'food' || (type === 'log' && food?.basicFoodId === null)) {
    dispatch('setFoodToUpdate', food?.id)
    dispatch('openFoodFormModal')
  } else if (type === 'recipe' || (type === 'log' && recipe)) {
    dispatch('openRecipeFormModal', recipe?.id)
  } else if (type === 'ingredient') {
    // Do nothing
  }
}
