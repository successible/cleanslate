import { css } from '@emotion/react'
import Link from 'next/link'
import { getLoginStatus } from '../../helpers/getLoginStatus'
import { colors } from '../../theme'

export const Navbar = () => {
  return (
    <nav
      className="fr"
      css={css`
        height: 70px;
        width: 100%;
        background-color: white;
        border-bottom: 1px solid ${colors.lightgrey};
        height: 70px;
        left: 0;
        position: fixed;
        top: 0;

        a {
          text-decoration: none;
        }
      `}
    >
      <Link href="/" passHref>
        <span
          css={css`
            font-size: 1.3rem !important;
            font-weight: 700 !important;
            padding-left: 30px;
            padding-right: 30px;
            cursor: pointer;
          `}
        >
          {' '}
          Clean Slate
        </span>
      </Link>
      <Link href="/" passHref>
        <button
          suppressHydrationWarning={true}
          type="button"
          className="pink semi-bold normal"
          css={css`
            height: 40px;
            text-decoration: none !important;
          `}
        >
          {getLoginStatus() ? 'App' : 'Login'}
        </button>
      </Link>
    </nav>
  )
}
