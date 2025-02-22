import { css } from '@emotion/react'
import type React from 'react'

type props = { color?: string; height?: number; width?: number }
export const Spinner: React.FC<props> = ({ color, height, width }) => {
  const style = css`
    background-color: ${color || '#333'};
    height: ${height || 18}px;
    width: ${width || 18}px;
  `

  const spinner = css`
    text-align: center;
    > div {
      animation: sk-bouncedelay 1.4s infinite ease-in-out both;
      border-radius: 100%;
      display: inline-block;
    }
    .bounce1 {
      animation-delay: -0.32s;
    }
    .bounce2 {
      animation-delay: -0.16s;
    }
  `
  return (
    <div css={spinner} className={'frc w100 mt50'}>
      <div css={style} className={'bounce1'} />
      <div css={style} className={'bounce2'} />
      <div css={style} className={'bounce3'} />
    </div>
  )
}
