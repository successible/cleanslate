import { css } from '@emotion/react'
import { Unit } from '../../../models/Log/types'
import { makeUnitPretty } from '../helpers/makeUnitPretty'
import { CommonItem } from '../types'

type props = {
  item: CommonItem
  unit: Unit | null
}
export const UnitInput: React.FC<props> = ({ item, unit }) => (
  <div
    css={css`
      font-size: 12px;
      margin-top: 5px;
    `}
  >
    {makeUnitPretty(item, unit)}
  </div>
)
