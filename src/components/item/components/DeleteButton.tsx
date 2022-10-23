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
    onClick={() => {
      onDelete && onDelete(id)
    }}
  >
    <Image width={20} height={20} alt="Trash" src={Trash} />
  </button>
)
