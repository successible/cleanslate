import { css } from '@emotion/react'
import { convertDecimalToFraction } from '../../standard-editor/helpers/convertDecimalToFraction'

type props = { amount: number | null }
export const Amount: React.FC<props> = ({ amount }) => (
  <div
    css={css`
      font-size: 12px;
      margin-top: 5px;
      padding-right: 3px;
    `}
  >
    {convertDecimalToFraction(amount)}
  </div>
)
