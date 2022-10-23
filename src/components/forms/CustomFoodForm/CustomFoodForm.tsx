import { css } from '@emotion/react'
import React, { ReactText } from 'react'
import { useStoreon } from 'storeon/react'
import caratDown from '../../../assets/common/caratdown.svg'
import caratUp from '../../../assets/common/caratup.svg'
import { prep } from '../../../helpers/utility/prepareFractionalInputForSubmission'
import { Category } from '../../../models/Food/categories'
import { Group } from '../../../models/Food/groups'
import { addFoodToCloud } from '../../../models/Food/helpers/addFoodToCloud'
import { updateFoodOnCloud } from '../../../models/Food/helpers/updateFoodOnCloud'
import { Food } from '../../../models/Food/model'
import { VolumeUnit, WeightUnit } from '../../../models/Log/types'
import { AllEvents } from '../../../store/store'
import { Dispatch } from '../../../store/types'
import { colors } from '../../../theme'
import { Divider } from '../../divider/Divider'
import { Image } from '../../image/Image'
import { convertFromImperialToGrams } from '../../macros/helpers/convertFromImperialToGrams'
import { mapOtherVolumeUnitToTbsp } from '../../macros/helpers/mapOtherVolumeUnitToTbsp'
import { useReportIsDirty } from '../helpers/useReportIsDirty'
import { getAdjustedVolumeAmount } from './helpers/getAdjustedVolumeAmount'
import { getAdjustedWeightAmount } from './helpers/getAdjustedWeightAmount'
import { UnitSelector } from './UnitSelector'

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

  const [showOptional, updateShowOptional] = React.useState(false)
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
    (food?.countToGram || '') as ReactText
  )
  const [countToTbsp, setCountToTbsp] = React.useState(
    (food?.countToTbsp || '') as ReactText
  )
  const [volumeUnit, setVolumeUnit] = React.useState(
    food?.preferredVolumeUnit || ('TBSP' as VolumeUnit)
  )
  const [weightUnit, setWeightUnit] = React.useState(
    food?.preferredWeightUnit || ('GRAM' as WeightUnit)
  )
  const [convertVolume, updateConvertVolume] = React.useState(true)
  const [convertWeight, updateConvertWeight] = React.useState(true)

  const convertedCountToGram = convertFromImperialToGrams(
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
    setCountToGram((food?.countToGram || '') as ReactText)
    setCountToTbsp((food?.countToTbsp || '') as ReactText)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [food])

  useReportIsDirty(
    food,
    {
      caloriesPerCount,
      countToGram: convertedCountToGram,
      countToTbsp: convertedCountToTbsp,
      name,
      proteinPerCount,
      servingPerContainer: prep(servingPerContainer),
    },
    'CustomFoodForm'
  )

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
          dispatch('closeFoodModal')
          dispatch('closeMenu')
        }
        if (food?.id) {
          const variables = {
            pk_columns: { id: food.id },
            set: { ...data },
          }

          if (!caloriesPerCount) {
            window.alert('Calories per serving cannot be zero or empty!')
            return
          }
          if (proteinPerCount === null || proteinPerCount === undefined) {
            window.alert('Protein per serving cannot be empty!')
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
      <button
        type="button"
        css={css`
          border-radius: 5px;
          img {
            margin-left: 10px;
            width: 10px;
          }
        `}
        className={`blue mt25 mb25 pbutton`}
        onClick={() => {
          updateShowOptional(!showOptional)
        }}
      >
        {food ? 'Edit' : 'Add'} units{' '}
        {showOptional ? (
          <Image width={10} height={10} src={caratUp} alt="Arrow pointing up" />
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
              amount={countToTbsp}
              unit={volumeUnit}
              units={['CUP', 'TBSP', 'TSP']}
              onChange={(unit, amount) => {
                setCountToTbsp(amount)
                setVolumeUnit(unit as VolumeUnit)
              }}
            />
            <UnitSelector
              amount={countToGram}
              unit={weightUnit}
              units={['GRAM', 'OZ', 'LBS']}
              onChange={(unit, amount) => {
                setCountToGram(amount)
                setWeightUnit(unit as WeightUnit)
              }}
            />
            <Divider
              height={1}
              className="mt20 mb0"
              styles={css`
                background-color: ${colors.lightgrey};
              `}
            />
            <UnitSelector
              unit={'CONTAINER'}
              amount={servingPerContainer}
              units={['CONTAINER']}
              onChange={(unit, amount) => updateServingPerContainer(amount)}
            />
          </div>
        </div>
      )}

      <button type="submit" className="purple bold mt30 mb10">
        {food ? 'Update Food' : 'Create Food'}
      </button>
    </form>
  )
}
