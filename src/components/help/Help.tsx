import { css } from '@emotion/react'
import React from 'react'
import { KeyboardShortcutKeys } from '../../helpers/createShortcuts'
import { colors } from '../../theme'
import { Divider } from '../divider/Divider'
import { documentation } from '../settings/Settings'

const shortcuts: Record<KeyboardShortcutKeys, string> = {
  b: 'Scan barcode',
  e: 'Log exercise',
  f: 'List custom foods',
  h: 'Show shortcuts',
  l: 'Log food',
  m: 'Show menu',
  q: 'Quick add',
  r: 'List recipes',
}

export const Help: React.FC = () => {
  const keyShortcuts = ['l', 'q', 'Escape', 'h']
  const subheader = css`
    font-size: 1.1rem;
    margin: 20px 0;
  `
  const shortcutContainer = css`
    margin-bottom: 15px;
    > div {
      border-radius: 5px;
      &:first-of-type {
        background-color: ${colors.background};
        margin-right: 10px;
        padding: 5px 10px;
      }
    }
  `
  return (
    <div css={documentation}>
      <h1>Keyboard shortcuts</h1>
      <h3 css={subheader} className={`fr`}>
        Primary{' '}
        <span
          css={css`
            margin-left: 5px;
            position: relative;
            top: -1px;
          `}
        >
          ⭐
        </span>
      </h3>
      {Object.entries({ Escape: 'Close all windows', ...shortcuts }).map(
        (shortcut) => {
          const [key, purpose] = shortcut
          if (keyShortcuts.includes(key)) {
            return (
              <div key={key} css={shortcutContainer} className={`fr`}>
                <div>{key}</div>
                <div>{purpose}</div>
              </div>
            )
          } else {
            return ''
          }
        }
      )}

      <Divider className="mt30 mb20" />
      <h3 className={`fr ${subheader}`}>Secondary</h3>
      {Object.entries(shortcuts).map((shortcut) => {
        const [key, purpose] = shortcut
        if (!keyShortcuts.includes(key)) {
          return (
            <div key={key} css={shortcutContainer} className={`fr`}>
              <div>{key}</div>
              <div>{purpose}</div>
            </div>
          )
        } else {
          return ''
        }
      })}
    </div>
  )
}
