import { css } from '@emotion/react'
import Check from '../../../assets/common/check.svg'
import { Image } from '../../image/Image'

type props = {
  onClick?: () => void
  className?: string
  submit: boolean
}
export const SubmitButton: React.FC<props> = ({
  className,
  onClick,
  submit,
}) => {
  const button = css`
    height: 50px;
    margin-left: auto;
    margin-top: 10px;
    width: 60px;
  `

  return (
    <button
      onClick={() => {
        if (onClick) onClick()
      }}
      css={button}
      className={`success ${className}`}
      type={submit ? 'submit' : 'button'}
    >
      <Image width={30} height={30} src={Check} alt="Check" />
    </button>
  )
}
