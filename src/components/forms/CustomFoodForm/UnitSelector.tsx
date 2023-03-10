import { css } from '@emotion/react'
import React from 'react'
import { Unit } from '../../../constants/units'

type props = {
  amount: string | number
  unit: Unit
  units: Unit[]
  onChange: (unit: Unit, amount: string | number) => void
}

const getAmount = (amount: string | number) =>
  typeof amount === 'number' ? amount : amount

export const UnitSelector: React.FC<props> = ({
  amount,
  onChange,
  unit,
  units,
}) => {
  const [newAmount, updateNewAmount] = React.useState(getAmount(amount))
  const [selectedUnit, updatedSelectedUnit] = React.useState(unit)
  const isContainer = units[0] === 'CONTAINER'

  // Make sure the form is filled with "late" data
  React.useEffect(() => {
    updatedSelectedUnit(unit)
    updateNewAmount(getAmount(amount))
  }, [amount, unit])

  return (
    <div className="fr w100 mt20">
      <input
        value={newAmount}
        inputMode="decimal"
        onChange={(e) => {
          const amount = e.target.value
          updateNewAmount(amount)
          onChange(unit, amount)
        }}
        className="mr10"
        css={css`
          width: 90px;
        `}
        type="text"
        placeholder={''}
      />{' '}
      {isContainer ? (
        <span
          css={css`
            padding: 10px;
            width: 100px;
          `}
        >
          servings
        </span>
      ) : (
        <select
          value={selectedUnit}
          onChange={(e) => {
            const unit = e.target.value as Unit
            updatedSelectedUnit(unit)
            onChange(unit, newAmount)
          }}
          className="mr10"
          css={css`
            width: 100px;
          `}
        >
          {units.map((unit) => (
            <option key={unit} value={unit}>
              {`${unit.toLowerCase()}`}
            </option>
          ))}
        </select>
      )}
      <span
        className="ml5"
        css={css`
          white-space: nowrap;
        `}
      >
        {isContainer ? 'per container ' : 'per serving'}
      </span>
    </div>
  )
}
