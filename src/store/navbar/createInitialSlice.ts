import { NavbarSlice } from './types'

/** Create the initial state of the navbar module */
export const createInitialSlice = (): NavbarSlice => {
  return {
    navbar: {
      activeModals: [],
      addIngredientModalVisibility: false,
      bodyFatPercentageModalVisibility: false,
      caloricMaintenanceModalVisibility: false,
      cameraModalVisibility: false,
      error: '',
      errorVisibility: false,
      exerciseModalVisibility: false,
      foodFormModalVisibility: false,
      foodModalVisibility: false,
      foodToUpdate: null,
      helpModalVisibility: false,
      Information: null,
      informationModalVisibility: false,
      isDirty: {
        CustomFoodForm: false,
        RecipeForm: false,
      },
      itemModalVisibility: false,
      itemToUpdate: undefined,
      menuVisibility: false,
      modalVisibility: false,
      moduleModalVisibility: false,
      offline: false,
      pwaPromptVisibility: false,
      quickAddModalVisibility: false,
      recipeFormModalVisibility: false,
      recipeModalVisibility: false,
      recipeToUpdate: null,
      settingsModalVisibility: false,
      targetModalVisibility: false,
      unitModalVisibility: false,
      user: 'PENDING',
    },
  }
}
