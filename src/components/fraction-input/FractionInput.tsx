import { css } from '@emotion/react'
import { isMobile } from '../../helpers/isMobile'
import { HiddenInput } from '../buttons/HiddenInput'

type props = {
  value: string | number
  setValue: (value: string) => void
  placeholder?: string
  label?: string
  className?: string
  inputRef?: React.RefObject<HTMLInputElement>
}
export const FractionInput: React.FC<props> = ({
  className,
  inputRef,
  label,
  placeholder,
  setValue,
  value,
}) => {
  const styles = css`
    height: 41px;
    margin-left: 10px;
  `

  return (
    <div className={`${className} fr w100`}>
      {label && <label>{label}</label>}
      <input
        id="FractionInputInput"
        onChange={(event) => {
          setValue(event.target.value)
        }}
        ref={inputRef}
        required
        step="any"
        type="text"
        inputMode="decimal"
        autoComplete={'off'}
        autoCorrect={'off'}
        autoCapitalize={'off'}
        value={value}
        placeholder={placeholder || ''}
      />
      {isMobile() && (
        <button
          onClick={() => {
            setValue(value + '/')
          }}
          css={styles}
          className={`pink`}
          type="button"
        >
          <HiddenInput inputMode="decimal" />/
        </button>
      )}
    </div>
  )
}
