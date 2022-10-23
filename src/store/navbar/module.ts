import cloneDeep from 'clone-deep'
import dotProp from 'dot-prop-immutable'
import { StoreonModule } from 'storeon'
import { updateModal } from '../../helpers/ui/updateModal'
import { CleanslateSlices } from '../store'
import { createInitialSlice } from './createInitialSlice'
import { modals } from './modals'
import { NavbarEvents } from './types'

export const navbar: StoreonModule<CleanslateSlices, NavbarEvents> = (
  store
) => {
  store.on('@init', () => createInitialSlice())

  store.on('updateUser', (state, user) => {
    return dotProp.set(state, 'navbar.user', user)
  })

  store.on('openAlert', (state, alert) => {
    const newState = dotProp.set(state, 'navbar.alert', alert)
    return updateModal(newState, 'navbar.alertVisibility', true)
  })

  store.on('closeAlert', (state) => {
    const newState = dotProp.set(state, 'navbar.alert', null)
    return updateModal(newState, 'navbar.alertVisibility', false)
  })

  store.on('openPWAPrompt', (state) => {
    return updateModal(state as any, 'navbar.pwaPromptVisibility', true)
  })

  store.on('closePWAPrompt', (state) => {
    return updateModal(state as any, 'navbar.pwaPromptVisibility', false)
  })

  store.on('openError', (state, error) => {
    const newState = dotProp.set(state, 'navbar.error', error)
    return updateModal(newState, 'navbar.errorVisibility', true)
  })

  store.on('closeError', (state) => {
    const newState = dotProp.set(state, 'navbar.error', null)
    return updateModal(newState, 'navbar.errorVisibility', false)
  })

  store.on('isOffline', (state, status) => {
    return dotProp.set(state, 'navbar.offline', status)
  })

  store.on('closeMenu', (state) => {
    return updateModal(state, 'navbar.menuVisibility', false)
  })

  store.on('openMenu', (state) => {
    return updateModal(state, 'navbar.menuVisibility', true)
  })

  store.on('closeFoodModal', (state) => {
    return updateModal(state, 'navbar.foodModalVisibility', false)
  })

  store.on('openFoodModal', (state) => {
    return updateModal(state, 'navbar.foodModalVisibility', true)
  })

  store.on('closeFoodFormModal', (state) => {
    const newState = updateModal(state, 'navbar.foodFormModalVisibility', false)
    return dotProp.set(newState, 'navbar.foodToUpdate', null)
  })

  store.on('openFoodFormModal', (state) => {
    return updateModal(state, 'navbar.foodFormModalVisibility', true)
  })

  store.on('setFoodToUpdate', (state, id) => {
    return dotProp.set(state, 'navbar.foodToUpdate', id)
  })

  store.on('closeRecipeModal', (state) => {
    return updateModal(state, 'navbar.recipeModalVisibility', false)
  })

  store.on('openRecipeModal', (state) => {
    return updateModal(state, 'navbar.recipeModalVisibility', true)
  })

  store.on('closeRecipeFormModal', (state) => {
    return updateModal(state, 'navbar.recipeFormModalVisibility', false)
  })

  store.on('openRecipeFormModal', (state, event) => {
    const newState = updateModal(
      state,
      'navbar.recipeFormModalVisibility',
      true
    )
    return dotProp.set(newState, 'navbar.recipeToUpdate', event)
  })

  store.on('openAddIngredientModal', (state, event) => {
    const newState = updateModal(
      state,
      'navbar.addIngredientModalVisibility',
      true
    )
    return dotProp.set(newState, 'navbar.recipeToUpdate', event)
  })

  store.on('closeAddIngredientModal', (state) => {
    return updateModal(state, 'navbar.addIngredientModalVisibility', false)
  })

  store.on('closeItemModal', (state) => {
    return updateModal(state, 'navbar.itemModalVisibility', false)
  })

  store.on('openItemModal', (state, event) => {
    const newState = updateModal(state, 'navbar.itemModalVisibility', true)
    return dotProp.set(newState, 'navbar.itemToUpdate', event)
  })

  store.on('closeUnitModal', (state) => {
    return updateModal(state, 'navbar.unitModalVisibility', false)
  })

  store.on('openUnitModal', (state, event) => {
    const newState = updateModal(state, 'navbar.unitModalVisibility', true)
    return dotProp.set(newState, 'navbar.itemToUpdate', event)
  })

  store.on('closeTargetModal', (state) => {
    return updateModal(state, 'navbar.targetModalVisibility', false)
  })

  store.on('openTargetModal', (state) => {
    return updateModal(state, 'navbar.targetModalVisibility', true)
  })

  store.on('openModal', (state) => {
    return updateModal(state, 'navbar.modalVisibility', true)
  })

  store.on('closeModal', (state) => {
    return updateModal(state, 'navbar.modalVisibility', false)
  })

  store.on('openQuickAddModal', (state) => {
    return updateModal(state, 'navbar.quickAddModalVisibility', true)
  })

  store.on('closeQuickAddModal', (state) => {
    return updateModal(state, 'navbar.quickAddModalVisibility', false)
  })

  store.on('closeHelpModal', (state) => {
    return updateModal(state, 'navbar.helpModalVisibility', false)
  })

  store.on('openHelpModal', (state) => {
    return updateModal(state, 'navbar.helpModalVisibility', true)
  })

  store.on('closeInformationModal', (state) => {
    return updateModal(state, 'navbar.informationModalVisibility', false)
  })

  store.on('openInformationModal', (state) => {
    return updateModal(state, 'navbar.informationModalVisibility', true)
  })

  store.on('closeExerciseModal', (state) => {
    return updateModal(state, 'navbar.exerciseModalVisibility', false)
  })

  store.on('openExerciseModal', (state) => {
    return updateModal(state, 'navbar.exerciseModalVisibility', true)
  })

  store.on('closeSettingsModal', (state) => {
    return updateModal(state, 'navbar.settingsModalVisibility', false)
  })

  store.on('openSettingsModal', (state) => {
    return updateModal(state, 'navbar.settingsModalVisibility', true)
  })

  store.on('closeBodyFatPercentageModal', (state) => {
    return updateModal(state, 'navbar.bodyFatPercentageModalVisibility', false)
  })

  store.on('openBodyFatPercentageModal', (state) => {
    return updateModal(state, 'navbar.bodyFatPercentageModalVisibility', true)
  })

  store.on('updateIsDirty', (state, target) => {
    const [name, value] = target
    return dotProp.set(state, `navbar.isDirty.${name}`, value)
  })

  store.on('closeAllModals', (state) => {
    const newNavbar = cloneDeep(state.navbar)
    modals
      .map((modal) => modal.replace('navbar.', ''))
      .forEach((modal) => {
        // @ts-ignore
        if (newNavbar[modal]) {
          // @ts-ignore
          newNavbar[modal] = false
        }
      })
    return dotProp.set(state, 'navbar', newNavbar)
  })
}
