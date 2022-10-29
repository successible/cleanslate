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
      width: 35px;
      height: 35px;
    `}
    onClick={() => {
      onDelete && onDelete(id)
    }}
  >
    <Image width={18} height={18} alt="Trash" src={Trash} />
  </button>
)
