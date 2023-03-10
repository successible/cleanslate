import { StoreonModule } from 'storeon'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import { CommonItem } from '../../components/item/types'
import { User } from '../../helpers/getUser'

export type NavbarSlice = {
  navbar: NavbarState
}

export type UserStatus = User | null | 'PENDING'
export type Form = 'CustomFoodForm' | 'RecipeForm'

export type NavbarState = {
  activeModals: readonly any[]
  addIngredientModalVisibility: boolean
  bodyFatPercentageModalVisibility: boolean
  caloricMaintenanceModalVisibility: boolean
  cameraModalVisibility: boolean
  error: string
  errorVisibility: boolean
  exerciseModalVisibility: boolean
  foodFormModalVisibility: boolean
  foodModalVisibility: boolean
  foodToUpdate: string | null
  helpModalVisibility: boolean
  Information: EmotionJSX.Element | null
  informationModalVisibility: boolean
  isDirty: Record<Form, boolean>
  itemModalVisibility: boolean
  itemToUpdate: CommonItem | undefined
  menuVisibility: boolean
  modalVisibility: boolean
  moduleModalVisibility: boolean
  offline: boolean
  pwaPromptVisibility: boolean
  quickAddModalVisibility: boolean
  recipeFormModalVisibility: boolean
  recipeModalVisibility: boolean
  recipeToUpdate: string | null
  settingsModalVisibility: boolean
  targetModalVisibility: boolean
  unitModalVisibility: boolean
  user: UserStatus
}

export type NavbarEvents = {
  closeAddIngredientModal: undefined
  closeAllModals: undefined
  closeBodyFatPercentageModal: undefined
  closeCameraModal: undefined
  closeError: undefined
  closeExerciseModal: undefined
  closeFoodFormModal: undefined
  closeFoodModal: undefined
  closeFoodScoreModal: undefined
  closeHelpModal: undefined
  closeInformationModal: undefined
  closeItemModal: undefined
  closeMenu: undefined
  closeModal: undefined
  closePWAPrompt: undefined
  closeQuickAddModal: undefined
  closeRecipeFormModal: undefined
  closeRecipeModal: undefined
  closeSettingsModal: undefined
  closeSupportModal: undefined
  closeTargetModal: undefined
  closeTherapyModal: undefined
  closeUnitModal: undefined
  isOffline: boolean
  openAddIngredientModal: string | null
  openBodyFatPercentageModal: undefined
  openCameraModal: undefined
  openError: string
  openExerciseModal: undefined
  openFoodFormModal: string | null
  openFoodModal: undefined
  openHelpModal: undefined
  openInformationModal: string | null
  openItemModal: CommonItem
  openMenu: undefined
  openModal: undefined
  openPWAPrompt: undefined
  openQuickAddModal: undefined
  openRecipeFormModal: string | null
  openRecipeModal: undefined
  openSettingsModal: undefined
  openTargetModal: undefined
  openUnitModal: CommonItem
  setFoodToUpdate: string
  setItemToUpdate: CommonItem
  updateIsDirty: [Form, boolean]
  updateUser: User | null
}

export type NavbarModule = StoreonModule<NavbarSlice, NavbarEvents>

export type Sex = 'female' | 'male' | 'other'
