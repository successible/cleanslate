import React from 'react'
import { useStoreon } from 'storeon/react'
import { Unit } from '../../constants/units'
import { round } from '../../helpers/round'
import { AllEvents } from '../../store/store'
import { Dispatch } from '../../store/types'
import { FractionInput } from '../fraction-input/FractionInput'
import { createDefaultItem } from '../item/helpers/createDefaultItem'
import { CommonItem } from '../item/types'
import { Select } from '../select/Select'
import { Meta } from './components/Meta'
import { SubmitButton } from './components/SubmitButton'
import { UnitInput } from './components/UnitInput'
import { submitItem } from './helpers/submitItem'

type props = {
  item: CommonItem | undefined
}

export const ItemModal: React.FC<props> = ({ item }) => {
  const { dispatch }: { dispatch: Dispatch<AllEvents> } = useStoreon()
  // Extract information from props
  const itemToUse = item === undefined ? createDefaultItem() : item
  const { amount, barcode, onUpdate, unit } = itemToUse

  // Create the local form state
  const [localUnit, setLocalUnit] = React.useState(unit)
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
        submitItem(itemToUse, localAmount, localUnit, dispatch, onUpdate)
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
            />
          )}
        </div>
      )}
      {/* Submit button */}
      {amount && unit && <SubmitButton submit={true} />}
    </form>
  )
}
