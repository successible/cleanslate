import { type SerializedStyles, css } from '@emotion/react'
import React from 'react'
import { colors } from '../../theme'

type TabType = { image: string; title: string }
export type TabDirectory = Record<string, TabType>

type props = {
  selected: string | null
  onSelect: (tab: string | null) => void
  tabs: TabDirectory
  styles?: SerializedStyles
  className?: string
}
export const Tabs: React.FC<props> = ({
  className,
  onSelect,
  selected,
  styles,
  tabs,
}) => {
  const startingTab = selected ? tabs[selected] : null
  const [selection, updateSelection] = React.useState(startingTab)

  const tabStyles = css`
    border: 1px solid ${colors.lightgrey};
    border-radius: 5px;
    color: ${colors.text};
    flex: 1;
    font-size: 0.9rem;
    margin: 0 5px;
    padding: 10px 15px;
    &.active {
      background-color: ${colors.background} !important;
      font-weight: 500;
    }
    img {
      height: 20px;
      margin-left: 10px;
      width: 20px;
    }
  `

  return (
    <div css={styles} className={`fr w100 wrap ${className}`}>
      {Object.keys(tabs).map((tab, index) => {
        return (
          <button
            onClick={() => {
              onSelect(tab)
              updateSelection(tabs[tab])
            }}
            type="button"
            key={tab}
            css={tabStyles}
            className={`tab ${
              tabs[tab].title === selection?.title && tab !== null
                ? 'active'
                : ''
            }`}
          >
            <div>{tabs[tab].title}</div>
            {/* @ts-ignore */}
            {tabs[tab].image && <img alt="Tab" src={tabs[tab].image.src} />}
          </button>
        )
      })}
    </div>
  )
}
