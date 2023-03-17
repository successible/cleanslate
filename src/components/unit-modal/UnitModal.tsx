import React from 'react'
import { useStoreon } from 'storeon/react'
import { QuickAddUnit } from '../../constants/units'
import { Log } from '../../models/log'
import { Profile } from '../../models/profile'
import { AllEvents } from '../../store/store'
import { Dispatch } from '../../store/types'
import { FractionInput } from '../fraction-input/FractionInput'
import { Meta } from '../item-modal/components/Meta'
import { SubmitButton } from '../item-modal/components/SubmitButton'
import { createDefaultItem } from '../item/helpers/createDefaultItem'
import { CommonItem } from '../item/types'
import { updateUnitLogsOnCloud } from '../list/Unit/helpers/updateUnitLogsOnCloud'

type props = { profile: Profile; logs: Log[]; item: CommonItem | undefined }
export const UnitModal: React.FC<props> = ({ item, logs, profile }) => {
  const { dispatch }: { dispatch: Dispatch<AllEvents> } = useStoreon()
  const { enablePlanning } = profile
  const itemToUse =
    item === undefined ? createDefaultItem(enablePlanning) : item
  const [amount, updateAmount] = React.useState(itemToUse.amount || '')

  // Create the local refs
  const inputRef = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => {
    // Focus the amount input when the unit modal is spawned
    inputRef.current?.focus()
  }, [inputRef])

  return (
    <form
      className="fcc mw600 mt30"
      onSubmit={(event) => {
        event.preventDefault()
        updateUnitLogsOnCloud(
          logs,
          Number(amount),
          item?.unit as QuickAddUnit,
          profile.enablePlanning,
          () => {
            dispatch('closeUnitModal')
          }
        )
      }}
    >
      <Meta item={itemToUse} />
      <FractionInput
        className="mb30"
        value={amount}
        setValue={updateAmount}
        inputRef={inputRef}
      />
      <SubmitButton submit={true} />
    </form>
  )
}
