import { css } from '@emotion/react'
import { xlg } from '../../theme'
import { alertHeight } from '../alert/Alert'

export const getAlertStyling = () => {
  return css`
    align-items: flex-start !important;
    background: transparent !important;
    justify-content: flex-start !important;
    > div:first-of-type {
      background: transparent !important;
      border-radius: 0 !important;
      height: ${alertHeight}px !important;
      margin: 0 !important;
      min-height: ${alertHeight}px !important;
      min-width: 100vw !important;
    }
  `
}

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

// Unless alert is also active, in which case make it AND the top modal visible
export const modalContainerStylingWithAlerts = css`
  > div:nth-last-of-type(2) > div {
    opacity: 1 !important;
  }
`
