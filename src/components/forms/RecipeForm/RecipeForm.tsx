import { css } from '@emotion/react'
import { curry } from '@typed/curry'
import React, { useEffect } from 'react'
import { useStoreon } from 'storeon/react'
import caratDown from '../../../assets/common/caratdown.svg'
import caratUp from '../../../assets/common/caratup.svg'
import { VolumeUnit, WeightUnit } from '../../../constants/units'
import { prep } from '../../../helpers/prepareFractionalInputForSubmission'
import { Food } from '../../../models/food'
import { Ingredient } from '../../../models/ingredient'
import { Profile } from '../../../models/profile'
import { Recipe } from '../../../models/recipe'
import { EditorState } from '../../../store/editor/types'
import { AllEvents } from '../../../store/store'
import { Dispatch } from '../../../store/types'
import { Image } from '../../image/Image'
import { IngredientList } from '../../list/Ingredient/IngredientList'
import { convertFromWeightToGrams } from '../../macros/helpers/convertFromWeightToGrams'
import { mapOtherVolumeUnitToTbsp } from '../../macros/helpers/mapOtherVolumeUnitToTbsp'
import { Macros } from '../../macros/Macros'
import { UnitSelector } from '../CustomFoodForm/UnitSelector'
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

  const [showOptional, updateShowOptional] = React.useState(false)
  const [name, updateName] = React.useState(recipe?.name || '')
  const [countName, updateCountName] = React.useState(recipe?.countName || '')

  const [countToGram, setCountToGram] = React.useState(
    (recipe?.countToGram || '') as string | number
  )
  const [countToTbsp, setCountToTbsp] = React.useState(
    (recipe?.countToTbsp || '') as string | number
  )
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [servingPerContainer, updateServingPerContainer] = React.useState(
    recipe?.servingPerContainer || ''
  )
  const [volumeUnit, setVolumeUnit] = React.useState('TBSP' as VolumeUnit)
  const [weightUnit, setWeightUnit] = React.useState('GRAM' as WeightUnit)

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
    servingPerContainer: prep(servingPerContainer),
  }

  // Make sure the form is filled with "late" data
  React.useEffect(() => {
    updateName(recipe?.name || '')
    updateCountName(recipe?.countName || '')
    setIngredients(remoteIngredients)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      <div className="fr w100 mt20 mb25">
        <button
          onClick={() => dispatch('openAddIngredientModal', recipe?.id)}
          type="button"
          css={addIngredientStyling}
          className={`green`}
        >
          Add ingredient +
        </button>

        {ingredients.length > 0 && (
          <div className="background end pbutton-large rounded nohover">
            <Macros log={createRecipeLog(ingredients)} profile={profile} />
          </div>
        )}
      </div>

      <IngredientList
        recipe={recipe}
        ingredients={ingredients}
        updateIngredient={curry(updateIngredients)(ingredients)}
        deleteIngredient={deleteIngredient}
      />
      <div className="w100">
        <button
          type="button"
          css={css`
            border-radius: 5px;
            img {
              margin-left: 10px;
              width: 10px;
            }
          `}
          className={`blue pbutton mt30`}
          onClick={() => {
            updateShowOptional(!showOptional)
          }}
        >
          {recipe ? 'Edit' : 'Add'} units{' '}
          {showOptional ? (
            <Image
              width={10}
              height={10}
              src={caratUp}
              alt="Arrow pointing up"
            />
          ) : (
            <Image
              width={10}
              height={10}
              src={caratDown}
              alt="Arrow pointing Down"
            />
          )}
        </button>
        {showOptional && (
          <div className="mb20">
            <div className="mt20">
              <UnitSelector
                title={'per recipe'}
                amount={countToTbsp}
                unit={volumeUnit}
                units={['CUP', 'TBSP', 'TSP']}
                onChange={(unit, amount) => {
                  setCountToTbsp(amount)
                  setVolumeUnit(unit as VolumeUnit)
                }}
              />
              <UnitSelector
                title={'per recipe'}
                amount={countToGram}
                unit={weightUnit}
                units={['GRAM', 'OZ', 'LBS']}
                onChange={(unit, amount) => {
                  setCountToGram(amount)
                  setWeightUnit(unit as WeightUnit)
                }}
              />

              {/* Because countName of "bowl" is ambiguous between serving and container, we disable container  */}
              {/* <UnitSelector
                unit={'CONTAINER'}
                amount={servingPerContainer}
                units={['CONTAINER']}
                onChange={(unit, amount) => updateServingPerContainer(amount)}
              /> */}
            </div>
          </div>
        )}
      </div>

      <button type="submit" className="purple bold mt20 start">
        {recipe ? 'Update Recipe' : 'Create Recipe'}
      </button>
    </form>
  )
}
