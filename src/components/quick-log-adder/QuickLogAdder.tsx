import Parser from 'expr-eval'

import { css } from '@emotion/react'
import React from 'react'
import { toast } from 'react-toastify'
import { addQuickLogToCloud } from '../../helpers/quick-log/addQuickLogToCloud'
import type { NavbarState } from '../../store/navbar/types'
import { useStoreon } from '../../storeon'
import { colors } from '../../theme'
import { SubmitButton } from '../item-update-modal/components/SubmitButton'

export const QuickLogAdder: React.FC = () => {
  const [calories, setCalories] = React.useState(null as string | null)
  const [protein, setProtein] = React.useState(null as string | null)
  const [name, setName] = React.useState('')

  const inputToFocus = React.useRef<HTMLInputElement>(null)

  const {
    navbar,
  }: {
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
    border-right: 1px solid ${colors.lightgrey};

    &:focus {
      font-weight: 400;
    }

    &:nth-of-type(3) {
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
          const parser = new Parser.Parser()
          addQuickLogToCloud(
            name,
            parser.parse(calories || '0').evaluate(),
            parser.parse(protein || '0').evaluate()
          )
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
        className={'w33'}
        id="calories"
        onChange={(event) => {
          setCalories(event.target.value)
        }}
        placeholder="Calories"
        ref={inputToFocus}
        step="any"
        type="text"
        value={calories || ''}
      />

      <input
        autoCapitalize={'off'}
        autoComplete={'off'}
        autoCorrect={'off'}
        css={input}
        className={'w33'}
        id="protein"
        onChange={(event) => {
          setProtein(event.target.value)
        }}
        placeholder="Protein"
        step="any"
        type="text"
        value={protein || ''}
      />

      <input
        autoCapitalize={'off'}
        autoComplete={'off'}
        autoCorrect={'off'}
        css={input}
        className={'w33'}
        id="name"
        onChange={(event) => {
          setName(event.target.value)
        }}
        placeholder="Food (Optional)"
        step="any"
        type="string"
        value={name || ''}
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
