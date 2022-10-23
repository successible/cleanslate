import Pencil from '../../../assets/common/pencil.svg'
import { AllEvents } from '../../../store/store'
import { Dispatch } from '../../../store/types'
import { HiddenInput } from '../../buttons/HiddenInput'
import { Image } from '../../image/Image'
import { spawnInstanceEditModal } from '../helpers/spawnInstanceEditModal'
import { CommonItem } from '../types'

type props = {
  item: CommonItem
  dispatch: Dispatch<AllEvents>
}
export const UpdateButton: React.FC<props> = ({ dispatch, item }) => {
  const { type } = item
  const clickable = ['ingredient', 'log', 'unit'].includes(type)
  return (
    <button
      type="button"
      className="background mr5"
      onClick={() => spawnInstanceEditModal(item, dispatch)}
    >
      {clickable && <HiddenInput />}
      <Image width={20} height={20} alt="Pencil" src={Pencil} />
    </button>
  )
}
