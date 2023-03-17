import { css } from '@emotion/react'
import React from 'react'
import toast from 'react-hot-toast'
import { useStoreon } from 'storeon/react'
import { Profile } from '../../models/profile'
import { DataEvents } from '../../store/data/types'
import { EditorEvents } from '../../store/editor/types'
import { NavbarEvents, NavbarState } from '../../store/navbar/types'
import { Dispatch } from '../../store/types'
import { colors } from '../../theme'
import { SubmitButton } from '../item-modal/components/SubmitButton'
import { addQuickAddLog } from '../standard-adder/helpers/addQuickAddLog'

type props = { profile: Profile }
export const QuickAdder: React.FC<props> = ({ profile }) => {
  const { enablePlanning } = profile
  const [calories, setCalories] = React.useState(null as number | string | null)
  const [protein, setProtein] = React.useState(null as number | string | null)

  const inputToFocus = React.useRef<HTMLInputElement>(null)

  const {
    dispatch,
    navbar,
  }: {
    dispatch: Dispatch<
      keyof NavbarEvents | keyof DataEvents | keyof EditorEvents
    >
    navbar: NavbarState
  } = useStoreon('navbar')

  // Focus on the calorie input when it is spawned
  React.useEffect(() => {
    // Clear the numbers when the components mounts and unmounts
    setCalories(null)
    setProtein(null)

    if (inputToFocus.current && navbar.quickAddModalVisibility) {
      inputToFocus.current?.focus()
    }
  }, [navbar.quickAddModalVisibility])

  const form = css`
    border-radius: 0;
    margin: 0;
  `
  const input = css`
    border: 0;
    border-radius: 0;
    height: 60px;
    &:focus {
      font-weight: 400;
    }
    &:first-of-type {
      border-right: 1px solid ${colors.lightgrey};
    }
    &:nth-of-type(2) {
      padding-left: 30px;
    }
  `

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        if (!calories && !protein) {
          toast.error('You must include a value!')
        } else {
          addQuickAddLog(
            Number(calories),
            Number(protein),
            enablePlanning,
            dispatch
          )
        }
      }}
      css={form}
      className={`frc w100`}
    >
      <input
        autoCapitalize={'off'}
        autoComplete={'off'}
        autoCorrect={'off'}
        css={input}
        className={`w50`}
        id="calories"
        inputMode="decimal"
        onChange={(event) => {
          setCalories(event.target.value)
        }}
        placeholder="Calories"
        ref={inputToFocus}
        step="any"
        type="number"
        value={calories || ''}
      />
      <input
        autoCapitalize={'off'}
        autoComplete={'off'}
        autoCorrect={'off'}
        css={input}
        className={`w50`}
        id="protein"
        inputMode="decimal"
        onChange={(event) => {
          setProtein(event.target.value)
        }}
        placeholder="Protein"
        step="any"
        type="number"
        value={protein || ''}
      />

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
