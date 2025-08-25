import { css } from '@emotion/react'

type props = { type?: string; inputMode?: string }
export const HiddenInput: React.FC<props> = ({ inputMode, type }) => {
  const input = css`
    border: 0;
    cursor: pointer;
    height: 100%;
    left: 0;
    opacity: 0;
    padding: 0;
    position: absolute;
    top: 0;
    width: 100%;
  `
  return (
    <input
      type={type || 'text'}
      // Cannot get the React inputMode type to work
      // @ts-expect-error
      inputMode={inputMode || 'text'}
      tabIndex={-1}
      css={input}
      autoCapitalize={'off'}
      autoComplete={'off'}
      autoCorrect={'off'}
    />
  )
}
