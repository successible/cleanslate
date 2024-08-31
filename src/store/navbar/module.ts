import { produce } from 'immer'
import { cloneDeep } from 'lodash-es'
import type { CommonItem } from '../../components/item/types'
import { modals } from '../../constants/modals'
import { updateModal } from '../../helpers/updateModal'
import type { StoreonModule } from '../../storeon'
import type { CleanslateSlices } from '../store'
import { createInitialSlice } from './createInitialSlice'
import type { NavbarEvents } from './types'

export const navbar: StoreonModule<CleanslateSlices, NavbarEvents> = (
  store
) => {
  store.on('@init', () => createInitialSlice())

  store.on('updateUser', (state, user) => {
    return produce(state, (draft) => {
      draft.navbar.user = user
    })
  })

  store.on('openPWAPrompt', (state) => {
    return updateModal(state as any, 'navbar.pwaPromptVisibility', true)
  })

  store.on('closePWAPrompt', (state) => {
    return updateModal(state as any, 'navbar.pwaPromptVisibility', false)
  })

  store.on('openError', (state, error) => {
    const newState = produce(state, (draft) => {
      draft.navbar.error = error
    })
    return updateModal(newState, 'navbar.errorVisibility', true)
  })

  store.on('closeError', (state) => {
    const newState = produce(state, (draft) => {
      draft.navbar.error = null
    })
    return updateModal(newState, 'navbar.errorVisibility', false)
  })

  store.on('isOffline', (state, status) => {
    return produce(state, (draft) => {
      draft.navbar.offline = status
    })
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
    return produce(newState, (draft) => {
      draft.navbar.foodToUpdate = null
    })
  })

  store.on('openFoodFormModal', (state) => {
    return updateModal(state, 'navbar.foodFormModalVisibility', true)
  })

  store.on('setFoodToUpdate', (state, id) => {
    return produce(state, (draft) => {
      draft.navbar.foodToUpdate = id
    })
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
    return produce(newState, (draft) => {
      draft.navbar.recipeToUpdate = event
    })
  })

  store.on('openAddIngredientModal', (state, event) => {
    const newState = updateModal(
      state,
      'navbar.addIngredientModalVisibility',
      true
    )
    return produce(newState, (draft) => {
      draft.navbar.recipeToUpdate = event
    })
  })

  store.on('closeAddIngredientModal', (state) => {
    const newState = produce(state, (draft) => {
      draft.editor.ingredient = null
    })
    return updateModal(newState, 'navbar.addIngredientModalVisibility', false)
  })

  store.on('closeItemModal', (state) => {
    return updateModal(state, 'navbar.itemModalVisibility', false)
  })

  store.on('openItemModal', (state, event) => {
    const newState = updateModal(state, 'navbar.itemModalVisibility', true)
    return produce(newState, (draft) => {
      draft.navbar.itemToUpdate = event
    })
  })

  store.on('closeQuickLogEditModal', (state) => {
    return updateModal(state, 'navbar.quickLogEditModalVisibility', false)
  })

  store.on('openQuickLogEditModal', (state, event) => {
    const newState = updateModal(
      state,
      'navbar.quickLogEditModalVisibility',
      true
    )
    return produce(newState, (draft) => {
      draft.navbar.itemToUpdate = event
    })
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
    const newState = updateModal(
      state,
      'navbar.informationModalVisibility',
      false
    )
    return produce(newState, (draft) => {
      draft.navbar.Information = null
    })
  })

  store.on('openInformationModal', (state, Information = null) => {
    const newState = updateModal(
      state,
      'navbar.informationModalVisibility',
      true
    )
    return produce(newState, (draft) => {
      draft.navbar.Information = Information
    })
  })

  store.on('closeExerciseModal', (state) => {
    const newState = updateModal(state, 'navbar.exerciseModalVisibility', false)
    return produce(newState, (draft) => {
      draft.navbar.itemToUpdate = undefined
    })
  })

  store.on('openExerciseModal', (state, item: CommonItem | null) => {
    const newState = updateModal(state, 'navbar.exerciseModalVisibility', true)

    if (item) {
      return produce(newState, (draft) => {
        draft.navbar.itemToUpdate = item
      })
    }

    return newState
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

  store.on('closeBarcodeModal', (state) => {
    return updateModal(state, 'navbar.barcodeModalVisibility', false)
  })

  store.on('openBarcodeModal', (state) => {
    return updateModal(state, 'navbar.barcodeModalVisibility', true)
  })

  store.on('closeDensityModal', (state) => {
    return updateModal(state, 'navbar.densityModalVisibility', false)
  })

  store.on('openDensityModal', (state) => {
    return updateModal(state, 'navbar.densityModalVisibility', true)
  })

  store.on('closeAllModals', (state) => {
    const newNavbar = cloneDeep(state.navbar)
    newNavbar.Information = null
    newNavbar.activeModals = []
    modals
      .map((modal) => modal.replace('navbar.', ''))
      .forEach((modal) => {
        // @ts-ignore
        if (newNavbar[modal]) {
          // @ts-ignore
          newNavbar[modal] = false
        }
      })
    return produce(state, (draft) => {
      // @ts-ignore
      draft.navbar = newNavbar
    })
  })
}
