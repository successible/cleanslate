import { css } from '@emotion/react'
import { xlg } from '../../theme'

export const getErrorStyling = () => css`
  > div:first-of-type {
    background: transparent !important;
  }
`

// Make it so only the most recently active modal is visible...
export const modalContainerStyling = css`
  @media (min-width: ${xlg + 1}px) {
    > div > div {
      opacity: 0 !important;
    }
    > div:last-child > div {
      opacity: 1 !important;
    }
  }
`
