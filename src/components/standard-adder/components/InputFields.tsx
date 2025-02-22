import React from 'react'
import type { Unit } from '../../../constants/units'
import type { Food } from '../../../models/food'
import type { Meal } from '../../../models/log'
import type { Recipe } from '../../../models/recipe'
import { FractionInput } from '../../fraction-input/FractionInput'
import { getPrettyUnits } from '../../list/helpers/getPrettyUnits'
import { MealInput } from '../../meal-input/MealInput'
import { Select } from '../../select/Select'

type props = {
  selectedItem: Food | Recipe | null
  unit: Unit | null
  units?: Unit
  setUnit: (unit: Unit) => void
  amount: string | number
  setAmount: (amount: string) => void
  meal: Meal
  setMeal: (meal: Meal) => void
  enablePlanning: boolean
}

export const InputFields: React.FC<props> = ({
  amount,
  enablePlanning,
  meal,
  selectedItem,
  setAmount,
  setMeal,
  setUnit,
  unit,
}) => {
  const amountInput = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (selectedItem?.name) {
      amountInput.current?.focus()
    }
  }, [selectedItem?.name])

  return (
    <div className={'w100'}>
      {/* amount */}
      <FractionInput
        inputRef={amountInput}
        className="m20"
        value={amount || ''}
        setValue={setAmount}
        placeholder={'Enter amount...'}
      />

      {/* unit */}
      {selectedItem && (
        <Select
          focus={false}
          currentOption={unit}
          optionDictionary={getPrettyUnits(selectedItem)}
          onChange={(newUnit: Unit) => {
            setUnit(newUnit)
          }}
        />
      )}

      {enablePlanning && <MealInput meal={meal} setMeal={setMeal} />}
    </div>
  )
}
