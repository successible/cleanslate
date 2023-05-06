import React from 'react'
import { useStoreon } from 'storeon/react'
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

type props = {
  profile: Profile
  item: CommonItem | undefined
}

export const ItemModal: React.FC<props> = ({ item, profile }) => {
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
  const amountRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    // Focus the amount input when the item modal is spawned
    amountRef.current?.focus()
  }, [amountRef])

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
      {amount && unit && <SubmitButton submit={true} />}
    </form>
  )
}
