import { css, SerializedStyles } from '@emotion/react'
import React from 'react'
import { colors } from '../../theme'

type props = {
  className?: string
  height?: number
  styles?: SerializedStyles
}
export const Divider: React.FC<props> = ({ className, height, styles }) => {
  const divider = css`
    background-color: ${colors.background};
    height: ${height || 2}px;
    width: 100%;
  `
  return <div className={className} css={[divider, styles]} />
}
