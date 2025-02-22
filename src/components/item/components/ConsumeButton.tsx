import { css } from '@emotion/react'
import { updateLogOnCloud } from '../../../helpers/log/updateLogOnCloud'
import type { AllEvents } from '../../../store/store'
import type { Dispatch } from '../../../store/types'
import type { CommonItem } from '../types'
import { nameStyling } from './Meta'

type props = {
  item: CommonItem
  dispatch: Dispatch<AllEvents>
}
export const ConsumeButton: React.FC<props> = ({ item }) => {
  return (
    <div className="fr mt10">
      <div css={nameStyling}>Eaten:</div>
      <input
        css={css`
          width: 25px !important;
          height: 25px !important;
          margin: 0px !important;
          margin-left: 5px !important;
          position: relative;
          top: 1px;
        `}
        onChange={() => {
          item.unit &&
            item.amount !== null &&
            updateLogOnCloud(
              {
                pk_columns: {
                  id: item.id,
                },
                set: {
                  amount: item.amount,
                  consumed: !item.consumed,
                  unit: item.unit,
                },
              },
              () => {}
            )
        }}
        checked={item.consumed || false}
        type="checkbox"
        id="consumed"
      />
    </div>
  )
}
