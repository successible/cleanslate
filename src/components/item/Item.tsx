import { css } from '@emotion/react'
import { useStoreon } from 'storeon/react'
import { AllEvents } from '../../store/store'
import { Dispatch } from '../../store/types'
import { DeleteButton } from './components/DeleteButton'
import { Meta } from './components/Meta'
import { UpdateButton } from './components/UpdateButton'
import { CommonItem } from './types'

export const Item = (props: { item: CommonItem }) => {
  const { dispatch }: { dispatch: Dispatch<AllEvents> } = useStoreon()

  const { item } = props
  const { id, onDelete, type } = item

  const itemStyles = css`
    margin: 20px auto;
  `

  return (
    <div css={itemStyles} className={`w100 item item-${type}`}>
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
