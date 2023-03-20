import { css } from '@emotion/react'
import React from 'react'
import { colors } from '../../theme'

// X is Units
type props<X extends string> = {
  currentOption: X | null
  optionDictionary: Record<X, string>[]
  onChange: (option: X) => void
  focus: boolean
}

export const Select = <X extends string>(props: props<X>) => {
  const { currentOption, focus, onChange, optionDictionary } = props
  const optionInput = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    // Only focus the input on being spawned if the developer explicitly requests it for that component
    if (optionInput.current && focus) {
      optionInput.current.focus()
    }
  }, [focus])

  const buttons = css`
    button {
      flex: 1;
      font-weight: 500 !important;
      margin: 5px;
      text-transform: uppercase;
    }
  `

  const active = css`
    background-color: ${colors.blue} !important;
    &:hover,
    &:focus {
      background-color: ${colors.darkblue} !important;
    }
  `

  return (
    <div css={buttons} ref={optionInput} className={`frc w100 wrap`}>
      {optionDictionary.map((optionSet, index) => {
        return (
          <div key={index} className="w100 frc">
            {(Object.keys(optionSet) as X[]).map((option) => (
              <button
                type="button"
                id={`Select-${option}`}
                onClick={() => {
                  onChange(option)
                }}
                css={currentOption === option ? active : ''}
                className={`background bold`}
                key={option}
              >
                {optionSet[option].toLowerCase()}
              </button>
            ))}
          </div>
        )
      })}
    </div>
  )
}
