import type { CommonItem } from '../../components/item/types'
import type { User } from '../../helpers/getUser'
import type { StoreonModule } from '../../storeon'

export type NavbarSlice = {
  navbar: NavbarState
}

export type UserStatus = User | null | 'PENDING'
export type Form = 'CustomFoodForm' | 'RecipeForm'
type BarcodeModalMode = 'log' | 'ingredient'

export type NavbarState = {
  activeModals: readonly any[]
  addIngredientModalVisibility: boolean
  barcodeModalMode: BarcodeModalMode
  barcodeModalVisibility: boolean
  bodyFatPercentageModalVisibility: boolean
  caloricMaintenanceModalVisibility: boolean
  densityModalVisibility: boolean
  error: string | null
  errorVisibility: boolean
  exerciseModalVisibility: boolean
  foodFormModalVisibility: boolean
  foodModalVisibility: boolean
  foodToUpdate: string | null
  helpModalVisibility: boolean
  Information: React.ReactNode | string | null
  informationModalVisibility: boolean
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
  quickLogEditModalVisibility: boolean
  user: UserStatus
}

export type NavbarEvents = {
  closeAddIngredientModal: undefined
  closeAllModals: undefined
  closeBarcodeModal: undefined
  closeBodyFatPercentageModal: undefined
  closeDensityModal: undefined
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
  closeQuickLogEditModal: undefined
  isOffline: boolean
  openAddIngredientModal: string | null
  openBarcodeModal: BarcodeModalMode
  openBodyFatPercentageModal: undefined
  openDensityModal: undefined
  openError: string
  openExerciseModal: CommonItem | null
  openFoodFormModal: string | null
  openFoodModal: undefined
  openHelpModal: undefined
  openInformationModal: React.ReactNode | string | null
  openItemModal: CommonItem
  openMenu: undefined
  openModal: undefined
  openPWAPrompt: undefined
  openQuickAddModal: undefined
  openRecipeFormModal: string | null
  openRecipeModal: undefined
  openSettingsModal: undefined
  openTargetModal: undefined
  openQuickLogEditModal: CommonItem
  setFoodToUpdate: string
  setItemToUpdate: CommonItem
  updateUser: User | null
}

export type NavbarModule = StoreonModule<NavbarSlice, NavbarEvents>

export type Sex = 'female' | 'male' | 'other'
