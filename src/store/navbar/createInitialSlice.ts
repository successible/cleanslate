import type { NavbarSlice } from "./types";

/** Create the initial state of the navbar module */
export const createInitialSlice = (): NavbarSlice => {
  return {
    navbar: {
      activeModals: [],
      addIngredientModalVisibility: false,
      barcodeModalVisibility: false,
      bodyFatPercentageModalVisibility: false,
      caloricMaintenanceModalVisibility: false,
      densityModalVisibility: false,
      error: "",
      errorVisibility: false,
      exerciseModalVisibility: false,
      foodFormModalVisibility: false,
      foodModalVisibility: false,
      foodToUpdate: null,
      helpModalVisibility: false,
      Information: null,
      informationModalVisibility: false,
      itemModalVisibility: false,
      itemToUpdate: undefined,
      menuVisibility: false,
      modalVisibility: false,
      moduleModalVisibility: false,
      offline: false,
      pwaPromptVisibility: false,
      quickAddModalVisibility: false,
      quickLogEditModalVisibility: false,
      recipeFormModalVisibility: false,
      recipeModalVisibility: false,
      recipeToUpdate: null,
      settingsModalVisibility: false,
      targetModalVisibility: false,
      user: "PENDING",
    },
  };
};
