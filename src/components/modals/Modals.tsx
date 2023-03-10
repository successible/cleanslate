/* eslint-disable react/jsx-key */
import { css } from '@emotion/react'
import React from 'react'
import { useStoreon } from 'storeon/react'
import { modals } from '../../constants/modals'
import { getDispatch } from '../../helpers/getDispatch'
import { Food } from '../../models/food'
import { Log } from '../../models/log'
import { Profile } from '../../models/profile'
import { Recipe } from '../../models/recipe'
import { NavbarState } from '../../store/navbar/types'
import { CameraModal } from '../camera-modal/CameraModal'
import { Error } from '../error/Error'
import { BodyFatPercentageForm } from '../forms/BodyFatPercentageForm/BodyFatPercentageForm'
import { CustomFoodForm } from '../forms/CustomFoodForm/CustomFoodForm'
import { ExerciseForm } from '../forms/ExerciseForm/ExerciseForm'
import { RecipeForm } from '../forms/RecipeForm/RecipeForm'
import { TargetForm } from '../forms/TargetForm/TargetForm'
import { Help } from '../help/Help'
import { InformationModal } from '../information-modal/InformationModal'
import { IngredientModal } from '../ingredient-modal/IngredientModal'
import { ItemModal } from '../item-modal/ItemModal'
import { FoodList } from '../list/Food/FoodList'
import { RecipeList } from '../list/Recipe/RecipeList'
import { Menu } from '../menu/Menu'
import { Modal } from '../modal/Modal'
import { PWAPrompt } from '../pwa-prompt/PWAPrompt'
import { QuickAdder } from '../quick-adder/QuickAdder'
import { Settings } from '../settings/Settings'
import { StandardAdder } from '../standard-adder/StandardAdder'
import { UnitModal } from '../unit-modal/UnitModal'
import { getOrderedModals } from './getOrderedModal'
import { getErrorStyling, modalContainerStyling } from './styling'

type props = {
  profile: Profile
  foods: Food[]
  recipes: Recipe[]
  logs: Log[]
}

const Modals: React.FC<props> = ({ foods, logs, profile, recipes }) => {
  const {
    navbar,
  }: {
    navbar: NavbarState
  } = useStoreon('navbar')

  const dispatch = getDispatch()

  const {
    activeModals,
    addIngredientModalVisibility,
    bodyFatPercentageModalVisibility,
    cameraModalVisibility,
    errorVisibility,
    exerciseModalVisibility,
    foodFormModalVisibility,
    foodModalVisibility,
    foodToUpdate,
    helpModalVisibility,
    Information,
    informationModalVisibility,
    itemModalVisibility,
    itemToUpdate,
    menuVisibility,
    modalVisibility,
    pwaPromptVisibility,
    quickAddModalVisibility,
    recipeFormModalVisibility,
    recipeModalVisibility,
    recipeToUpdate,
    settingsModalVisibility,
    targetModalVisibility,
    unitModalVisibility,
  } = navbar

  const editorStyling = css`
    justify-content: flex-start !important;
    > div:first-of-type {
      border-radius: 0 !important;
      margin: 0 !important;
      max-width: 100% !important;
      padding: 0 !important;
      top: 0 !important;
      width: 100% !important;
      min-height: auto !important;
    }
  `

  const allModals = [
    <Modal
      styles={editorStyling}
      closeIcon={false}
      closeModal={() => {
        dispatch('closeModal')
        dispatch('clearEditor')
      }}
      inTransition={'slideInDown'}
      outTransition={'fadeOutHard'}
      name="navbar.modalVisibility"
      visible={modalVisibility}
    >
      <StandardAdder recipes={recipes} foods={foods} type="log" />
    </Modal>,

    <Modal
      styles={editorStyling}
      closeIcon={false}
      closeModal={() => {
        dispatch('closeQuickAddModal')
      }}
      inTransition={'slideInDown'}
      outTransition={'fadeOutHard'}
      name="navbar.quickAddModalVisibility"
      visible={quickAddModalVisibility}
    >
      <QuickAdder />
    </Modal>,

    // Sidebar
    <Modal
      closeModal={() => {
        dispatch('closeMenu')
      }}
      visible={menuVisibility}
      name="navbar.menuVisibility"
    >
      <Menu />
    </Modal>,

    // Exercise-form
    <Modal
      closeModal={() => {
        dispatch('closeExerciseModal')
      }}
      name="navbar.exerciseModalVisibility"
      visible={exerciseModalVisibility}
    >
      <ExerciseForm />
    </Modal>,

    // Camera Modal
    <Modal
      styles={css`
        > div {
          max-width: 450px !important;
        }
      `}
      closeModal={() => {
        dispatch('closeCameraModal')
      }}
      name="navbar.cameraModalVisibility"
      visible={cameraModalVisibility}
    >
      <CameraModal />
    </Modal>,

    // target-form
    <Modal
      closeModal={() => {
        dispatch('closeTargetModal')
      }}
      name="navbar.targetModalVisibility"
      visible={targetModalVisibility}
    >
      <TargetForm profile={profile} />
    </Modal>,

    // Settings modal
    <Modal
      closeModal={() => {
        dispatch('closeSettingsModal')
      }}
      name="navbar.settingsModalVisibility"
      visible={settingsModalVisibility}
    >
      <Settings profile={profile} />
    </Modal>,

    // body-composition-form
    <Modal
      closeModal={() => {
        dispatch('closeBodyFatPercentageModal')
      }}
      name="navbar.bodyFatPercentageModalVisibility"
      visible={bodyFatPercentageModalVisibility}
    >
      <BodyFatPercentageForm />
    </Modal>,

    // food-form
    <Modal
      closeModal={() => {
        dispatch('closeFoodModal')
      }}
      name="navbar.foodModalVisibility"
      visible={foodModalVisibility}
    >
      <div className="w100 h100 fcs expand">
        <button
          type="button"
          onClick={() => {
            dispatch('openFoodFormModal', null)
          }}
          className="purple bold mb25"
        >
          Add custom food
        </button>
        <div className="w90 h100 fcs expand">
          <FoodList foods={foods} />
        </div>
      </div>
    </Modal>,

    // recipe-form
    <Modal
      closeModal={() => {
        dispatch('closeRecipeModal')
      }}
      name="navbar.recipeModalVisibility"
      visible={recipeModalVisibility}
    >
      <div className="w100 h100 fcs expand">
        <button
          type="button"
          onClick={() => {
            dispatch('openRecipeFormModal', null)
          }}
          className="purple bold mb25"
        >
          Add recipe
        </button>
        <div className="w90 h100 fcs expand">
          <RecipeList recipes={recipes} />
        </div>
      </div>
    </Modal>,

    // custom-recipe-form
    <Modal
      closeModal={() => {
        const message =
          'You have unsaved changes that will be deleted. Are you okay with that?'
        if (navbar.isDirty.RecipeForm === false || window.confirm(message)) {
          dispatch('closeRecipeFormModal')
          dispatch('updateIsDirty', ['RecipeForm', false])
        }
      }}
      name="navbar.recipeFormModalVisibility"
      visible={recipeFormModalVisibility}
    >
      <RecipeForm
        profile={profile}
        foods={foods}
        recipe={
          recipes.filter((recipe) => {
            return recipe.id === recipeToUpdate
          })[0]
        }
      />
    </Modal>,

    <Modal // add ingredient modal
      closeIcon={true}
      closeModal={() => {
        dispatch('closeAddIngredientModal')
      }}
      name="navbar.addIngredientModalVisibility"
      visible={addIngredientModalVisibility}
    >
      <IngredientModal recipes={recipes} foods={foods} />
    </Modal>,

    // custom-food-form
    <Modal
      closeModal={() => {
        const message =
          'You have unsaved changes that will be deleted. Are you okay with that?'
        if (
          navbar.isDirty.CustomFoodForm === false ||
          window.confirm(message)
        ) {
          dispatch('closeFoodFormModal')
          dispatch('updateIsDirty', ['CustomFoodForm', false])
        }
      }}
      name="navbar.foodFormModalVisibility"
      visible={foodFormModalVisibility}
    >
      <CustomFoodForm
        food={
          foods.filter((food) => {
            return food.id === foodToUpdate
          })[0]
        }
      />
    </Modal>,
    <Modal // item-modal
      id={'item-modal'}
      closeIcon={true}
      closeModal={() => {
        dispatch('closeItemModal')
      }}
      name="navbar.itemModalVisibility"
      visible={itemModalVisibility}
    >
      <ItemModal item={itemToUpdate} />
    </Modal>,
    <Modal // unit-modal
      id={'unit-modal'}
      closeIcon={true}
      closeModal={() => {
        dispatch('closeUnitModal')
      }}
      name="navbar.unitModalVisibility"
      visible={unitModalVisibility}
    >
      <UnitModal item={itemToUpdate} logs={logs} />
    </Modal>,
    <Modal
      closeModal={() => {
        dispatch('closeHelpModal')
      }}
      name="navbar.helpModalVisibility"
      visible={helpModalVisibility}
    >
      <Help />
    </Modal>,
    <Modal
      closeModal={() => {
        dispatch('closeInformationModal')
      }}
      visible={informationModalVisibility}
      name="navbar.informationModalVisibility"
    >
      <InformationModal Information={Information} />
    </Modal>,
    <Modal
      closeModal={() => {
        dispatch('closeError')
      }}
      closeIcon={false}
      key="navbar.errorVisibility"
      name="navbar.errorVisibility"
      styles={getErrorStyling()}
      visible={errorVisibility}
    >
      <Error />
    </Modal>,
    <Modal
      key="navbar.pwaPromptVisibility"
      name="navbar.pwaPromptVisibility"
      visible={pwaPromptVisibility}
      closeModal={() => {
        dispatch('closePWAPrompt')
      }}
    >
      <PWAPrompt profile={profile} />
    </Modal>,
  ]

  const modalsToRender = getOrderedModals(allModals, modals, activeModals)
  return (
    <div css={[modalContainerStyling]} className="z2">
      {modalsToRender
        .filter((modal) => modal?.props.name)
        .map((modal) => (
          <div key={modal?.props.name}>{modal}</div>
        ))}
    </div>
  )
}

export default Modals
