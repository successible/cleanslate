import { css } from '@emotion/react'
import { getStore } from '../../helpers/data/getStore'
import { AlertPayload } from './helpers/spawnAlert'

type props = {
  payload: AlertPayload | null
}

export const alertHeight = 70

export const Alert: React.FC<props> = ({ payload }) => {
  if (!payload) {
    return <div />
  } else {
    const { message, type } = payload
    const alert = css`
      cursor: pointer;
      height: ${alertHeight}px;
      padding-left: 20px;
    `

    const closeButton = css`
      background-color: transparent;
      border: 1px solid white;
      color: white;
      font-size: 1.2rem;
      font-weight: 900;
      margin-left: auto;
      margin-right: 30px;
      padding: 5px 7.5px;

      &:hover,
      &:focus {
        background-color: transparent;
        border: 1px solid white;
      }
    `

    const store = getStore()
    return (
      <div
        onClick={() => store.dispatch('closeAlert')}
        css={alert}
        className={`${type} fr w100 absolute bold z3`}
      >
        {message}
        <button type="button" css={closeButton}>
          X
        </button>
      </div>
    )
  }
}
