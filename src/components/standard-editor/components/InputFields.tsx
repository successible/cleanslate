import React from 'react'
import { Food } from '../../../models/Food/model'
import { Unit } from '../../../models/Log/types'
import { Recipe } from '../../../models/Recipes/model'
import { FractionInput } from '../../fraction-input/FractionInput'
import { getPrettyUnits } from '../../list/helpers/getPrettyUnits'
import { Select } from '../../select/Select'

type props = {
  searchResult: Food | Recipe | null
  unit: Unit | null
  setUnit: (unit: Unit) => void
  amount: React.ReactText
  setAmount: (amount: string) => void
}

export const InputFields: React.FC<props> = ({
  amount,
  searchResult,
  setAmount,
  setUnit,
  unit,
}) => {
  const amountInput = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (searchResult) {
      amountInput.current?.focus()
    }
  }, [searchResult])

  return (
    <div className={`w100`}>
      {/* amount */}
      <FractionInput
        inputRef={amountInput}
        className="m20"
        value={amount || ''}
        setValue={setAmount}
        placeholder={'Enter amount...'}
      />

      {/* unit */}
      {searchResult && (
        <Select
          focus={false}
          currentOption={unit}
          optionDictionary={getPrettyUnits(searchResult)}
          onChange={(newUnit: Unit) => {
            setUnit(newUnit)
          }}
        />
      )}
    </div>
  )
}
