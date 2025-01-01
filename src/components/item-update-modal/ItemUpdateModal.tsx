import React, { useEffect, useState } from 'react'
import { Unit } from '../../constants/units'
import { round } from '../../helpers/round'
import { Profile } from '../../models/profile'
import { AllEvents } from '../../store/store'
import { Dispatch } from '../../store/types'
import { FractionInput } from '../fraction-input/FractionInput'
import { createDefaultItem } from '../item/helpers/createDefaultItem'
import { CommonItem } from '../item/types'
import { MealInput } from '../meal-input/MealInput'
import { Select } from '../select/Select'
import { Meta } from './components/Meta'
import { SubmitButton } from './components/SubmitButton'
import { UnitInput } from './components/UnitInput'
import { submitItem } from './helpers/submitItem'
import { useStoreon } from '../../storeon'
import { MacroDisplay } from '../macros/MacroDisplay'
import { prep } from '../../helpers/prepareFractionalInputForSubmission'
import { calculatePerMacroPerFood, calculatePerMacroPerRecipe } from '../macros/helpers/calculateMacros'
import { calculateFoodOrRecipeDensities } from '../macros/helpers/calculateDensities'
import { Explanation } from '../explanation/Explanation'

type props = {
  profile: Profile
  item: CommonItem | undefined
}

export const ItemUpdateModal: React.FC<props> = ({ item, profile }) => {
  const { dispatch }: { dispatch: Dispatch<AllEvents> } = useStoreon()
  const { convertBetweenUnits, enablePlanning } = profile
  // Extract information from props
  const itemToUse =
    item === undefined ? createDefaultItem(enablePlanning) : item
  const { amount, barcode, consumed, meal, onUpdate, unit } = itemToUse

  // Create the local form state
  const [localUnit, setLocalUnit] = React.useState(unit)
  const [localMeal, setLocalMeal] = React.useState(meal)

  const [localAmount, setLocalAmount] = React.useState(
    amount ? String(round(amount, 2)) : ''
  )
  // Create the local refs
  const amountRef = React.useRef<HTMLInputElement | null>(null)
  const submitReady = Boolean(amount && unit)

  const [calories, setCalories] = useState(null as number | null)
  const [protein, setProtein] = useState(null as number | null)
  const [densities, setDensities] = useState(null as  [number, number, number] | null)


  React.useEffect(() => {
    // Focus the amount input when the item modal is spawned
    amountRef.current?.focus()
  }, [amountRef])

  const amountAsNumber = prep(localAmount)


  useEffect(() => {
    if (submitReady && amountAsNumber && localUnit && item?.food) {
      const calories = calculatePerMacroPerFood(amountAsNumber, localUnit, item.food, "CALORIE")
      const protein =  calculatePerMacroPerFood(amountAsNumber, localUnit, item.food, "PROTEIN")
      const densities = calculateFoodOrRecipeDensities(amountAsNumber, item.food, calories, protein)
      setCalories(calories)
      setProtein(protein)
      setDensities(densities)
    }
    else if (submitReady && amountAsNumber && localUnit && item?.recipe) {
      const calories = calculatePerMacroPerRecipe(item.recipe, "CALORIE", amountAsNumber, localUnit)
      const protein = calculatePerMacroPerRecipe(item.recipe, "PROTEIN", amountAsNumber, localUnit)
      const densities = calculateFoodOrRecipeDensities(amountAsNumber, item.recipe, calories, protein)
      setCalories(calories)
      setProtein(protein)
      setDensities(densities)
      
    } else {
      setCalories(null)
      setProtein(null)
      setDensities(densities)
    }
  }, [submitReady, amountAsNumber, localUnit, item, setCalories, setProtein, setDensities])


  return (
    <form
      className="fcc mw600 mt30"
      onSubmit={(event) => {
        event.preventDefault()
        submitItem(
          itemToUse,
          localAmount,
          localUnit,
          consumed,
          localMeal,
          dispatch,
          onUpdate
        )
      }}
    >
      {/* Meta */}
      <Meta item={itemToUse} />

      {/* Amount input  */}
      {typeof amount === 'number' && (
        <FractionInput
          inputRef={amountRef}
          value={localAmount}
          setValue={setLocalAmount}
          placeholder={'Enter amount...'}
        />
      )}
      {/* Unit input */}
      {unit && localUnit && (
        <div className="w100 mt10 mb10">
          {barcode ? (
            <Select
              focus={false}
              currentOption={localUnit}
              optionDictionary={[
                { COUNT: 'SERVING', GRAM: 'GRAM' } as Record<Unit, string>,
              ]}
              onChange={(newUnit: Unit) => {
                setLocalUnit(newUnit)
              }}
            />
          ) : (
            <UnitInput
              item={itemToUse}
              localAmount={localAmount}
              localUnit={localUnit}
              setLocalAmount={setLocalAmount}
              setLocalUnit={setLocalUnit}
              convertBetweenUnits={convertBetweenUnits}
            />
          )}
        </div>
      )}

      {meal && localMeal && profile.enablePlanning && (
        <MealInput meal={localMeal} setMeal={setLocalMeal} />
      )}

      {/* Submit button */}

      <div className='fr w100 wrap'>
        {submitReady && <Explanation color="green" className='mt0 frc w100' css={{height: 50}}>
          <div>
          {<MacroDisplay calories={calories || 0} protein={protein || 0} densities={densities || [0, 0, 0]} profile={profile} showTitles={true} />}
          </div>
        </Explanation>}
        {submitReady && <SubmitButton submit={true} />}
        </div>
    </form>
  )
}
