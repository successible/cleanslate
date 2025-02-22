import { css } from '@emotion/react'
import { colors } from '../../theme'

type props = {
  height: number
  children: React.ReactNode
}

export const BottomBar: React.FC<props> = ({ children, height }) => {
  const footer = css`
    border-top: 1px solid ${colors.lightgrey};
    height: ${height}px;
  `

  return (
    <div css={footer} id="footer" className={'frc w100 z2'}>
      {children}
    </div>
  )
}
