import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { convertToNumber } from '../../../helpers/convertToNumber'
import { getDispatch } from '../../../helpers/getDispatch'
import { Food } from '../../../models/food'
import { defaultMeal, Log } from '../../../models/log'
import { Profile } from '../../../models/profile'
import { Recipe } from '../../../models/recipe'
import { getPrettyUnits } from '../../list/helpers/getPrettyUnits'
import { getDefaultUnit } from '../helpers/getDefaultUnit'
import { submitEditor } from '../helpers/submitEditor'
import { AdderItem } from '../StandardAdder'
import { ButtonPanel } from './ButtonPanel'
import { InputFields } from './InputFields'
import { Meta } from './Meta'
import { Macros } from '../../macros/Macros'
import { calculatePerMacroPerFood, calculatePerMacroPerRecipe } from '../../macros/helpers/calculateMacros'
import { set } from 'traverse'
import { calculateFoodOrRecipeDensities } from '../../macros/helpers/calculateDensities'
import { MacroDisplay } from '../../macros/MacroDisplay'
import { round } from '../../../helpers/round'
import { Explanation } from '../../explanation/Explanation'

type props = {
  type: AdderItem
  selectedItem: Food | Recipe
  setSelectedItem: React.Dispatch<React.SetStateAction<Food | Recipe | null>>
  onBack: () => void
  profile: Profile
}
export const SelectedItem: React.FC<props> = ({
  onBack,
  profile,
  selectedItem,
  setSelectedItem,
  type,
}) => {
  const dispatch = getDispatch()
  const { enablePlanning } = profile

  const [amount, setAmount] = useState('')
  const [unit, setUnit] = useState(getDefaultUnit(getPrettyUnits(selectedItem)))
  const [meal, setMeal] = useState(defaultMeal)
  
  const [calories, setCalories] = useState(null as number | null)
  const [protein, setProtein] = useState(null as number | null)
  const [densities, setDensities] = useState(null as  [number, number, number] | null)

  const submitReady = Boolean(amount && unit)
  const amountAsNumber = convertToNumber(amount)

  const submit = () => {
    const status = submitEditor(
      type,
      selectedItem?.alias || null,
      amountAsNumber,
      unit,
      null,
      enablePlanning,
      meal,
      dispatch,
      selectedItem
    )
    if (status) {
      setSelectedItem(null)
    }
  }

  useEffect(() => {
    if (submitReady && selectedItem && amountAsNumber && selectedItem.type === "food") {
      const calories = calculatePerMacroPerFood(amountAsNumber, unit, selectedItem, "CALORIE")
      const protein =  calculatePerMacroPerFood(amountAsNumber, unit, selectedItem, "PROTEIN")
      const densities = calculateFoodOrRecipeDensities(amountAsNumber, selectedItem, calories, protein)
      setCalories(calories)
      setProtein(protein)
      setDensities(densities)
    }
    else if (submitReady && selectedItem && amountAsNumber && selectedItem.type === "recipe") {
      const calories = calculatePerMacroPerRecipe(selectedItem, "CALORIE", amountAsNumber, unit)
      const protein = calculatePerMacroPerRecipe(selectedItem, "PROTEIN", amountAsNumber, unit)
      const densities = calculateFoodOrRecipeDensities(amountAsNumber, selectedItem, calories, protein)
      setCalories(calories)
      setProtein(protein)
      setDensities(densities)
      
    } else {
      setCalories(null)
      setProtein(null)
      setDensities(densities)
    }
  }, [submitReady, selectedItem, unit, amountAsNumber, setCalories, setProtein])

  return (
    <form
      id="SelectedItem"
      css={css`
        margin: 0 auto;
        max-width: 500px;
      `}
      className={`mb20`}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault()
          submitReady && submit()
        }
      }}
    >
      <div className="fcc">
        <Meta
          isDummy={false}
          selectedItem={selectedItem}
          showBack={true}
          onBack={() => onBack()}
          path={[]}
        />
        <InputFields
          selectedItem={selectedItem}
          unit={unit}
          setUnit={setUnit}
          amount={amount}
          setAmount={setAmount}
          enablePlanning={enablePlanning}
          meal={meal}
          setMeal={setMeal}
        />
        <div className='fr w100 wrap'>
        {submitReady && <Explanation color="green" className='mt0 frc' css={{height: 50}}>
          <div>
          {<MacroDisplay calories={calories || 0} protein={protein || 0} densities={densities || [0, 0, 0]} profile={profile} showTitles={true} />}
          </div>
        </Explanation>}
        <ButtonPanel showSubmit={submitReady} submit={() => submit()} />
        </div>
      </div>
    </form>
  )
}
