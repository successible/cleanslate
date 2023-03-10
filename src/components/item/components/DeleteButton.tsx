import { css } from '@emotion/react'
import Trash from '../../../assets/common/trash.svg'
import { Image } from '../../image/Image'
import { OnDeleteItem } from '../types'

type props = {
  id: string
  onDelete: OnDeleteItem | null
}
export const DeleteButton: React.FC<props> = ({ id, onDelete }) => (
  <button
    type="button"
    className="background frc deleteButton"
    css={css`
      width: 42px;
      height: 42px;
    `}
    onClick={() => {
      onDelete && onDelete(id)
    }}
  >
    <Image width={22} height={22} alt="Trash" src={Trash} />
  </button>
)
