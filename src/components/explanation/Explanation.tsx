import { css, SerializedStyles } from '@emotion/react'
import React from 'react'
import { colors, Colors } from '../../theme'

export const Explanation: React.FC<{
  children: React.ReactNode
  color: Colors
  styles?: SerializedStyles
  className?: string
}> = ({ children, className, color, styles }) => {
  const explanation = css`
    background-color: ${colors[color]};
    border-radius: 5px;
    line-height: 1.6;
    margin: 0 auto;
    margin-top: 15px;
    padding: 20px 20px;
    width: 100%;
  `

  return (
    <div className={className} css={[explanation, styles]}>
      {children}
    </div>
  )
}
