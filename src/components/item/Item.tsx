import { css } from '@emotion/react'
import { AllEvents } from '../../store/store'
import { Dispatch } from '../../store/types'
import { DeleteButton } from './components/DeleteButton'
import { Meta } from './components/Meta'
import { UpdateButton } from './components/UpdateButton'
import { CommonItem } from './types'
import { useStoreon } from '../../storeon'

export const Item = (props: { item: CommonItem }) => {
  const { dispatch }: { dispatch: Dispatch<AllEvents> } = useStoreon()

  const { item } = props
  const { id, onDelete, type } = item

  const itemStyles = css`
    margin: 20px auto;
  `

  const consumedStyling = css`
    text-decoration: line-through;
    opacity: 0.5;
  `

  return (
    <div
      css={[
        itemStyles,
        item.consumed && item.profile?.enablePlanning && consumedStyling,
      ]}
      className={`w100 item item-${type}`}
    >
      <div className="fr">
        {/* Meta information */}
        <Meta item={item} dispatch={dispatch} />

        <div className="fr">
          <div className="fr">
            {/* Edit Button */}
            <UpdateButton item={item} dispatch={dispatch} />

            {/* Delete Button */}
            {onDelete && <DeleteButton id={id} onDelete={onDelete} />}
          </div>
        </div>
      </div>
    </div>
  )
}
