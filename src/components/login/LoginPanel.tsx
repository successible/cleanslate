import { css } from '@emotion/react'
import { isBrowser } from '../../helpers/isBrowser'
import { colors } from '../../theme'
import { LoginButtons } from './LoginButtons'

export const LoginPanel = () => {
  const panel = css`
    background-color: ${colors.background};
    height: 100%;

    > div {
      background-color: white !important;
      border-radius: 25px;
      box-shadow: rgb(0 0 0 / 10%) 0 36px 42px;
      position: relative;
      max-width: 500px;
      width: 90%;
      min-height: 375px;
    }
  `

  return (
    <div css={panel} className={`w100 fcc center scroll`}>
      <div className="fcc">
        <h1 style={{ fontSize: '1.8rem' }} className="mt50 mb20 tcenter">
          Clean Slate ❤️
        </h1>
        {isBrowser() && <LoginButtons />}
      </div>
    </div>
  )
}
