import { css, SerializedStyles } from '@emotion/react'
import React from 'react'
import Back from '../../assets/common/back.svg'
import { Image } from '../image/Image'

type props = {
  styles?: SerializedStyles
  onClick: () => void
  useUnderlineHover: boolean
}
export const BackButton: React.FC<props> = ({
  onClick,
  styles,
  useUnderlineHover,
}) => {
  const button = css`
    margin: 0;
    margin-left: 10px;
    padding: 0;
    > img {
      border-bottom: 1px solid white;
    }
  `

  const underlineHover = css`
    &:hover,
    &:focus {
      background-color: white;
      text-decoration: underline;
      > img {
        border-bottom: 1px solid grey;
      }
    }
  `

  return (
    <button
      css={[button, useUnderlineHover && underlineHover, styles]}
      className={`reset mt0 mb0`}
      type="button"
      onClick={onClick}
    >
      <Image width={15} height={15} alt="Back" src={Back} />
    </button>
  )
}
