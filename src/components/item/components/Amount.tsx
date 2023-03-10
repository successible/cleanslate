import { css } from '@emotion/react'
import { round } from '../../../helpers/round'

type props = { amount: number | null }
export const Amount: React.FC<props> = ({ amount }) => {
  return (
    <div
      css={css`
        padding-right: 3px;
      `}
    >
      {amount && round(amount, 2)}
    </div>
  )
}
