import { css } from '@emotion/react'
import type React from 'react'

type props = {
  children: React.ReactNode
  height: number
  onClick: () => void
}

export const TopBar: React.FC<props> = ({ children, height, onClick }) => {
  const topBar = css`
    background-color: white;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    height: ${height}px;
  `
  return (
    <div
      role="toolbar"
      css={topBar}
      onClick={() => onClick()}
      onKeyDown={() => onClick()}
      className={'fcc z2'}
    >
      {children}
    </div>
  )
}
