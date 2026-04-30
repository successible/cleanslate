import { css } from '@emotion/react'
import React from 'react'
import { toast } from 'react-toastify'
import { addWaterLogToCloud } from '../../helpers/water-log/addWaterLogToCloud'
import type { NavbarState } from '../../store/navbar/types'
import { useStoreon } from '../../storeon'
import { colors } from '../../theme'
import { SubmitButton } from '../item-update-modal/components/SubmitButton'

export const WaterLogAdder: React.FC = () => {
  const [amount, setAmount] = React.useState(null as string | null)
  const [unit, setUnit] = React.useState<'mL' | 'oz'>('mL')

  const inputToFocus = React.useRef<HTMLInputElement>(null)

  const {
    navbar,
  }: {
    navbar: NavbarState
  } = useStoreon('navbar')

  // Focus on the amount input when it is spawned
  React.useEffect(() => {
    setAmount(null)
    if (inputToFocus.current && navbar.waterAddModalVisibility) {
      inputToFocus.current?.focus()
    }
  }, [navbar.waterAddModalVisibility])

  const form = css`
    border-radius: 0;
    margin: 0;
  `
  const input = css`
    border: 0;
    border-radius: 0;
    height: 60px;
    border-right: 1px solid ${colors.lightgrey};

    &:focus {
      font-weight: 400;
    }
  `

  const unitButton = css`
    border: 0;
    border-radius: 0;
    height: 60px;
    min-width: 60px;
    font-weight: bold;
    cursor: pointer;
    background: ${colors.lightgrey};
  `

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        if (!amount) {
          toast.error('You must include an amount!')
        } else {
          addWaterLogToCloud(Number(amount), unit)
        }
      }}
      css={form}
      className={'frc w100'}
    >
      <input
        autoCapitalize={'off'}
        autoComplete={'off'}
        autoCorrect={'off'}
        css={input}
        className={'w50'}
        id="waterAmount"
        onChange={(event) => {
          setAmount(event.target.value)
        }}
        placeholder={`Amount (${unit})`}
        ref={inputToFocus}
        step="any"
        type="text"
        value={amount || ''}
      />

      <button
        type="button"
        css={unitButton}
        onClick={() => {
          setUnit(unit === 'mL' ? 'oz' : 'mL')
        }}
      >
        {unit}
      </button>

      <SubmitButton
        onClick={() => {}}
        submit={true}
        css={css`
          border-radius: 0;
          height: 60px;
          margin-top: 0;
        `}
      />
    </form>
  )
}
