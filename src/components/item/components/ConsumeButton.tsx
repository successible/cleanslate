import { css } from '@emotion/react'
import { updateLogOnCloud } from '../../../helpers/log/updateLogOnCloud'
import { AllEvents } from '../../../store/store'
import { Dispatch } from '../../../store/types'
import { CommonItem } from '../types'
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
          width: 20px !important;
          height: 20px !important;
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
