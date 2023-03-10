import { css } from '@emotion/react'
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
      css={css`
        width: 42px;
        height: 42px;
        margin-right: 10px !important;
      `}
      type="button"
      className="background mr5"
      onClick={() => spawnInstanceEditModal(item, dispatch)}
    >
      {clickable && <HiddenInput />}
      <Image width={22} height={22} alt="Pencil" src={Pencil} />
    </button>
  )
}
