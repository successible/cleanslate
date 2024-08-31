import { css } from '@emotion/react'
import React from 'react'
import { toast } from 'react-toastify';
import { Category } from '../../../constants/categories'
import { Group } from '../../../constants/groups'
import {
  VolumeUnit,
  volumeUnits,
  WeightUnit,
  weightUnits,
} from '../../../constants/units'
import { addFoodToCloud } from '../../../helpers/Food/addFoodToCloud'
import { updateFoodOnCloud } from '../../../helpers/Food/updateFoodOnCloud'
import { isNumeric } from '../../../helpers/isNumeric'
import { prep } from '../../../helpers/prepareFractionalInputForSubmission'
import { Food } from '../../../models/food'
import { AllEvents } from '../../../store/store'
import { Dispatch } from '../../../store/types'
import { colors } from '../../../theme'
import { Divider } from '../../divider/Divider'
import { Explanation } from '../../explanation/Explanation'
import { convertFromWeightToGrams } from '../../macros/helpers/convertFromWeightToGrams'
import { mapOtherVolumeUnitToTbsp } from '../../macros/helpers/mapOtherVolumeUnitToTbsp'
import { getAdjustedVolumeAmount } from './helpers/getAdjustedVolumeAmount'
import { getAdjustedWeightAmount } from './helpers/getAdjustedWeightAmount'
import { UnitSelector } from './UnitSelector'
import { useStoreon } from '../../../storeon';

export type FoodSubmission = {
  name: string
  group: Group
  category: Category
  countName: string
  containerName: string
  servingPerContainer: number | null
  caloriesPerCount: number | null
  proteinPerCount: number | null
  countToGram: number | null
  countToTbsp: number | null
  preferredVolumeUnit: VolumeUnit
  preferredWeightUnit: WeightUnit
}

type props = { food: Food | undefined }
export const CustomFoodForm: React.FC<props> = ({ food }) => {
  const { dispatch }: { dispatch: Dispatch<AllEvents> } = useStoreon()

  const [name, updateName] = React.useState(food?.name || '')
  const [caloriesPerCount, updateCaloriesPerCount] = React.useState(
    food?.caloriesPerCount || ''
  )
  const [proteinPerCount, updateProteinPerCount] = React.useState(
    food?.proteinPerCount || ''
  )
  const [servingPerContainer, updateServingPerContainer] = React.useState(
    food?.servingPerContainer || ''
  )
  const [countToGram, setCountToGram] = React.useState(
    (food?.countToGram || '') as string | number
  )
  const [countToTbsp, setCountToTbsp] = React.useState(
    (food?.countToTbsp || '') as string | number
  )
  const [volumeUnit, setVolumeUnit] = React.useState(
    food?.preferredVolumeUnit || ('TBSP' as VolumeUnit)
  )
  const [weightUnit, setWeightUnit] = React.useState(
    food?.preferredWeightUnit || ('GRAM' as WeightUnit)
  )
  const [convertVolume, updateConvertVolume] = React.useState(true)
  const [convertWeight, updateConvertWeight] = React.useState(true)

  const convertedCountToGram = convertFromWeightToGrams(
    weightUnit,
    prep(countToGram) || 0
  )

  const convertedCountToTbsp = mapOtherVolumeUnitToTbsp(
    volumeUnit,
    prep(countToTbsp) || 0
  )

  // Make sure the form is filled with "late" data
  React.useEffect(() => {
    updateName(food?.name || '')
    updateCaloriesPerCount(food?.caloriesPerCount || '')
    updateProteinPerCount(food?.proteinPerCount || '')
    updateServingPerContainer(food?.servingPerContainer || '')
    setCountToGram((food?.countToGram || '') as string | number)
    setCountToTbsp((food?.countToTbsp || '') as string | number)
    setVolumeUnit(food?.preferredVolumeUnit || ('TBSP' as VolumeUnit))
    setWeightUnit(food?.preferredWeightUnit || ('GRAM' as WeightUnit))

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
  }, [food])

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        const data: FoodSubmission = {
          caloriesPerCount: prep(caloriesPerCount),
          category: 'Food',
          containerName: food?.containerName || '',
          countName: food?.countName || '',
          countToGram: convertedCountToGram,
          countToTbsp: convertedCountToTbsp,
          group: 'Custom',
          name,
          preferredVolumeUnit: volumeUnit,
          preferredWeightUnit: weightUnit,
          proteinPerCount: prep(proteinPerCount),
          servingPerContainer: prep(servingPerContainer),
        }

        const close = () => {
          dispatch('closeFoodFormModal')
          dispatch('closeMenu')
        }
        if (food?.id) {
          const variables = {
            pk_columns: { id: food.id },
            set: { ...data },
          }

          if (!caloriesPerCount) {
            return toast.error('Calories per serving cannot be zero or empty!')
          }
          if (proteinPerCount === null || proteinPerCount === undefined) {
            return toast.error('Protein per serving cannot be empty!')
          }
          if (!isNumeric(caloriesPerCount)) {
            return toast.error('Calorie per serving must be a number!')
          }
          if (!isNumeric(proteinPerCount)) {
            return toast.error('Protein per serving must be a number!')
          }

          const countToGramZeroedOut = food.countToGram && !data.countToGram
          const countToTbspZeroedOut = food.countToTbsp && !data.countToTbsp
          const servingPerContainerZeroedOut =
            food.servingPerContainer && !data.servingPerContainer

          if (
            countToGramZeroedOut ||
            countToTbspZeroedOut ||
            servingPerContainerZeroedOut
          ) {
            alert(
              'When you remove a unit from a custom food, it can break the recipes and the logs if they have stored the custom food with that unit. For example, you have made a log with 500mL of pudding and you remove the tbsp per recipe. Make sure you fix them after this update!'
            )
          }

          updateFoodOnCloud(variables, () => close())
        } else {
          addFoodToCloud(data, () => dispatch('closeFoodFormModal'))
        }
      }}
    >
      <div className="group">
        <div className="w100">
          <label htmlFor="name">Food</label>
          <input
            id="name"
            autoCapitalize={'on'}
            autoComplete={'off'}
            autoCorrect={'off'}
            onChange={(event) => {
              updateName(event.target.value)
            }}
            placeholder="Chocolate pudding"
            required
            type="text"
            value={name || ''}
          />
        </div>
      </div>

      <div className="group">
        <div className="w50">
          <label htmlFor="caloriesPerCount">
            Calories
            <span className="tag pink">per serving</span>
          </label>
          <input
            id="caloriesPerCount"
            onChange={(event) => {
              updateCaloriesPerCount(event.target.value)
            }}
            required
            step="any"
            type="text"
            placeholder={'120'}
            inputMode="decimal"
            autoComplete={'off'}
            autoCorrect={'off'}
            autoCapitalize={'off'}
            value={caloriesPerCount}
          />
        </div>
        <div className="w50">
          <label htmlFor="proteinPerCount">
            Protein
            <span className="tag pink">per serving</span>
          </label>
          <input
            id="proteinPerCount"
            onChange={(event) => {
              updateProteinPerCount(event.target.value)
            }}
            required
            step="any"
            type="text"
            inputMode="decimal"
            placeholder="20"
            autoComplete={'off'}
            autoCorrect={'off'}
            autoCapitalize={'off'}
            value={proteinPerCount}
          />
        </div>
      </div>

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

      <div className="mb20">
        <div className="mt20">
          <UnitSelector
            amount={countToTbsp}
            unit={volumeUnit}
            units={volumeUnits}
            onChange={(unit, amount) => {
              setCountToTbsp(amount)
              setVolumeUnit(unit as VolumeUnit)
            }}
          />
          <UnitSelector
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
              id={`servings-per-container-input`}
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
              per food
            </span>
          </div>
        </div>
      </div>

      <button
        id="submitCustomFoodForm"
        type="submit"
        className="purple bold mt30 mb10"
      >
        {food ? 'Update Food' : 'Create Food'}
      </button>
    </form>
  )
}
