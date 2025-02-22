import { css } from '@emotion/react'
import { curry } from 'lodash-es'
import React, { useEffect } from 'react'
import {
  type VolumeUnit,
  type WeightUnit,
  volumeUnits,
  weightUnits,
} from '../../../constants/units'
import { prep } from '../../../helpers/prepareFractionalInputForSubmission'
import type { Food } from '../../../models/food'
import type { Ingredient } from '../../../models/ingredient'
import type { Profile } from '../../../models/profile'
import type { Recipe } from '../../../models/recipe'
import type { EditorState } from '../../../store/editor/types'
import type { AllEvents } from '../../../store/store'
import type { Dispatch } from '../../../store/types'
import { useStoreon } from '../../../storeon'
import { colors } from '../../../theme'
import { Divider } from '../../divider/Divider'
import { Explanation } from '../../explanation/Explanation'
import { IngredientList } from '../../list/Ingredient/IngredientList'
import { Macros } from '../../macros/Macros'
import { convertFromWeightToGrams } from '../../macros/helpers/convertFromWeightToGrams'
import { mapOtherVolumeUnitToTbsp } from '../../macros/helpers/mapOtherVolumeUnitToTbsp'
import { UnitSelector } from '../CustomFoodForm/UnitSelector'
import { getAdjustedVolumeAmount } from '../CustomFoodForm/helpers/getAdjustedVolumeAmount'
import { getAdjustedWeightAmount } from '../CustomFoodForm/helpers/getAdjustedWeightAmount'
import { upsertItem } from '../helpers/upsertItem'
import { createRecipeLog } from './helpers/createRecipeLog'
import { submitRecipe } from './helpers/submitRecipe'

type props = { recipe: Recipe | null; foods: Food[]; profile: Profile }

export type RecipeFormData = {
  name: string
  countName: string
  ingredients: Ingredient[]
  servingPerContainer: number | null
  countToGram: number | null
  countToTbsp: number | null
}

export const RecipeForm: React.FC<props> = ({ profile, recipe }) => {
  const {
    dispatch,
    editor,
  }: { dispatch: Dispatch<AllEvents>; editor: EditorState } =
    useStoreon('editor')

  const [name, updateName] = React.useState(recipe?.name || '')
  const [countName, updateCountName] = React.useState(recipe?.countName || '')

  const [countToGram, setCountToGram] = React.useState(
    (recipe?.countToGram || '') as string | number
  )
  const [countToTbsp, setCountToTbsp] = React.useState(
    (recipe?.countToTbsp || '') as string | number
  )
  const [servingPerContainer, updateServingPerContainer] = React.useState(
    recipe?.servingPerContainer || ''
  )
  const [volumeUnit, setVolumeUnit] = React.useState(
    recipe?.preferredVolumeUnit || ('TBSP' as VolumeUnit)
  )
  const [weightUnit, setWeightUnit] = React.useState(
    recipe?.preferredWeightUnit || ('GRAM' as WeightUnit)
  )

  const [convertVolume, updateConvertVolume] = React.useState(true)
  const [convertWeight, updateConvertWeight] = React.useState(true)

  const remoteIngredients = recipe?.ingredients || ([] as Ingredient[])
  const [ingredients, setIngredients] = React.useState(remoteIngredients)
  const { ingredient } = editor

  const convertedCountToGram = convertFromWeightToGrams(
    weightUnit,
    prep(countToGram) || 0
  )

  const convertedCountToTbsp = mapOtherVolumeUnitToTbsp(
    volumeUnit,
    prep(countToTbsp) || 0
  )

  const data = {
    countName,
    countToGram: convertedCountToGram,
    countToTbsp: convertedCountToTbsp,
    ingredients,
    name,
    preferredVolumeUnit: volumeUnit,
    preferredWeightUnit: weightUnit,
    servingPerContainer: prep(servingPerContainer),
  }

  // Make sure the form is filled with "late" data
  React.useEffect(() => {
    updateName(recipe?.name || '')
    updateCountName(recipe?.countName || '')
    setIngredients(remoteIngredients)
    setVolumeUnit(recipe?.preferredVolumeUnit || ('TBSP' as VolumeUnit))
    setWeightUnit(recipe?.preferredWeightUnit || ('GRAM' as WeightUnit))
    updateServingPerContainer(recipe?.servingPerContainer || '')

    // Only convert the volume and weight on the first time the page loads.
    // After that, treat them as "dumb numbers" until submission
    if (convertVolume) {
      setCountToTbsp(getAdjustedVolumeAmount(countToTbsp, volumeUnit))
      updateConvertVolume(false)
    }
    if (convertWeight) {
      setCountToGram(getAdjustedWeightAmount(countToGram, weightUnit))
      updateConvertWeight(false)
    }
  }, [recipe])

  // Helpers

  const updateIngredients = (
    ingredients: Ingredient[],
    updatedIngredient: Ingredient
  ) => {
    const updatedIngredients = upsertItem(ingredients, updatedIngredient)
    setIngredients(updatedIngredients)
  }

  const deleteIngredient = (id: string) => {
    const updatedIngredients = ingredients.filter(
      (ingredient) => ingredient.id !== id
    )
    setIngredients(updatedIngredients)
  }

  useEffect(() => {
    if (ingredient !== null) {
      updateIngredients(ingredients, ingredient)
      dispatch('saveIngredient', null)
      dispatch('closeAddIngredientModal', true)
      dispatch('closeBarcodeModal')
    }
  }, [dispatch, ingredient, ingredients])

  const addIngredientStyling = css`
    font-size: 0.8rem;
    position: relative;
  `

  const fields = () => {
    return (
      <div className="group">
        <div className="w60">
          <label htmlFor="nameRecipe">Name</label>
          <input
            placeholder="Chili"
            required
            id="nameRecipe"
            onChange={(event) => {
              updateName(event.target.value)
            }}
            value={data.name}
            type="text"
            autoCapitalize={'on'}
            autoComplete={'off'}
            autoCorrect={'off'}
          />
        </div>
        <div className="w40">
          <label htmlFor="countNameRecipe">Label</label>
          <input
            required
            id="countNameRecipe"
            onChange={(event) => {
              updateCountName(event.target.value)
            }}
            value={countName}
            type="text"
            placeholder="bowl"
            autoCapitalize={'off'}
            autoComplete={'off'}
            autoCorrect={'off'}
          />
        </div>
      </div>
    )
  }

  return (
    <form
      className="fcs expand"
      onSubmit={(event) => {
        event.preventDefault()

        submitRecipe(
          data,
          ingredients,
          remoteIngredients,
          recipe,
          dispatch,
          true
        )
      }}
    >
      {fields()}
      <div className="fc w100 mt20 mb25">
        <div className="bold">Add ingredients +</div>
        <div className="fr mt20">
          <button
            onClick={() => dispatch('openAddIngredientModal', recipe?.id)}
            type="button"
            css={addIngredientStyling}
            className={'green mr20'}
          >
            By Search
          </button>

          <button
            onClick={() => dispatch('openBarcodeModal')}
            type="button"
            css={addIngredientStyling}
            className={'green'}
          >
            By Barcode
          </button>
        </div>
      </div>
      <IngredientList
        recipe={recipe}
        ingredients={ingredients}
        updateIngredient={curry(updateIngredients)(ingredients)}
        deleteIngredient={deleteIngredient}
      />
      <Divider
        height={1}
        className="mt20 mb0"
        styles={css`
          background-color: ${colors.lightgrey};
        `}
      />
      <Explanation color="blue">
        <div>
          <strong>Note:</strong> These units are optional
        </div>
      </Explanation>
      <div className="w100">
        <div className="mb20">
          <div className="mt20">
            <UnitSelector
              title={'per recipe'}
              amount={countToTbsp}
              unit={volumeUnit}
              units={volumeUnits}
              onChange={(unit, amount) => {
                setCountToTbsp(amount)
                setVolumeUnit(unit as VolumeUnit)
              }}
            />
            <UnitSelector
              title={'per recipe'}
              amount={countToGram}
              unit={weightUnit}
              units={weightUnits}
              onChange={(unit, amount) => {
                setCountToGram(amount)
                setWeightUnit(unit as WeightUnit)
              }}
            />
            <div className="fr w100 mt20">
              <input
                id={'servings-per-container-input'}
                value={servingPerContainer}
                inputMode="decimal"
                onChange={(e) => {
                  updateServingPerContainer(e.target.value)
                }}
                className="mr10"
                css={css`
                  width: 90px;
                `}
                type="text"
                placeholder={''}
              />
              <span
                className="mr20 fr"
                css={css`
                  width: 100px;
                  padding-left: 10px;
                  border: 1px solid #ededed;
                  height: 41px;
                  border-radius: 5px;
                `}
              >
                <span>servings</span>
              </span>
              <span
                className=""
                css={css`
                  white-space: nowrap;
                  position: relative;
                  left: -5px;
                `}
              >
                per recipe
              </span>
            </div>
          </div>
        </div>
      </div>

      <Divider
        height={1}
        className="mb0"
        styles={css`
          background-color: ${colors.lightgrey};
        `}
      />

      <div className="fc w100 mt20">
        <div className="bold">Total</div>
        <div className="background pbutton-large rounded nohover mt20 mb20">
          <Macros
            log={createRecipeLog(ingredients)}
            profile={profile}
            showTitles
          />
        </div>
      </div>

      <button
        id="submitRecipeForm"
        type="submit"
        className="purple bold mt20 start"
      >
        {recipe ? 'Update Recipe' : 'Create Recipe'}
      </button>
    </form>
  )
}
