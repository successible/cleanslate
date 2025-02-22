import React from 'react'
import { updateQuickLogOnCloud } from '../../helpers/quick-log/updateQuickLogOnCloud'
import type { Profile } from '../../models/profile'
import type { AllEvents } from '../../store/store'
import type { Dispatch } from '../../store/types'
import { useStoreon } from '../../storeon'
import { SubmitButton } from '../item-update-modal/components/SubmitButton'
import { createDefaultItem } from '../item/helpers/createDefaultItem'
import type { CommonItem } from '../item/types'

type props = { profile: Profile; item: CommonItem | undefined }
export const QuickLogUpdateModal: React.FC<props> = ({ item, profile }) => {
  const { dispatch }: { dispatch: Dispatch<AllEvents> } = useStoreon()
  const { enablePlanning } = profile
  const itemToUse =
    item === undefined ? createDefaultItem(enablePlanning) : item
  const [name, setName] = React.useState(itemToUse.name || '')
  const [calories, setCalories] = React.useState(itemToUse.calories || '')
  const [protein, setProtein] = React.useState(itemToUse.protein || '')

  // Create the local refs
  const inputRef = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => {
    // Focus the calories input when the unit modal is spawned
    inputRef.current?.focus()
  }, [inputRef])

  return (
    <form
      className="mw600 mt30"
      onSubmit={(event) => {
        event.preventDefault()
        updateQuickLogOnCloud(
          {
            pk_columns: {
              id: itemToUse.id,
            },
            set: {
              calories: Number(calories),
              name,
              protein: Number(protein),
            },
          },
          () => {
            dispatch('closeQuickLogEditModal')
          }
        )
      }}
    >
      <label>Name</label>
      <input
        autoCapitalize={'off'}
        autoComplete={'off'}
        autoCorrect={'off'}
        id="name"
        onChange={(event) => {
          setName(event.target.value)
        }}
        placeholder="Food (Optional)"
        step="any"
        type="string"
        value={name === 'Quick Add' ? '' : name}
      />
      <label>Calories</label>
      <input
        autoCapitalize={'off'}
        autoComplete={'off'}
        autoCorrect={'off'}
        id="calories"
        inputMode="decimal"
        onChange={(event) => {
          setCalories(event.target.value)
        }}
        placeholder="Calories"
        ref={inputRef}
        step="any"
        type="number"
        value={calories || ''}
      />
      <label>Protein</label>
      <input
        autoCapitalize={'off'}
        autoComplete={'off'}
        autoCorrect={'off'}
        id="protein"
        inputMode="decimal"
        onChange={(event) => {
          setProtein(event.target.value)
        }}
        placeholder="Protein"
        step="any"
        type="number"
        value={protein || ''}
      />
      <SubmitButton submit={true} />
    </form>
  )
}
