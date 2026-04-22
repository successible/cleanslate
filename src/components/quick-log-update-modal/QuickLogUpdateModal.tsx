import React from 'react'
import { updateQuickLogOnCloud } from '../../helpers/quick-log/updateQuickLogOnCloud'
import type { Profile } from '../../models/profile'
import type { AllEvents } from '../../store/store'
import type { Dispatch } from '../../store/types'
import { convertToNumber } from '../../helpers/convertToNumber'
import { useStoreon } from '../../storeon'
import { createDefaultItem } from '../item/helpers/createDefaultItem'
import type { CommonItem } from '../item/types'
import { SubmitButton } from '../item-update-modal/components/SubmitButton'

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
              calories: convertToNumber(calories ?? 0) ?? 0,
              name,
              protein : convertToNumber(protein ?? 0) ?? 0,
            },
          },
          () => {
            dispatch('closeQuickLogEditModal')
          }
        )
      }}
    >
      <label htmlFor="name">Name</label>
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
      <label htmlFor="calories">Calories</label>
      <input
        autoCapitalize={'off'}
        autoComplete={'off'}
        autoCorrect={'off'}
        id="calories"
        onChange={(event) => {
          setCalories(event.target.value)
        }}
        placeholder="Calories"
        ref={inputRef}
        step="any"
        type="string"
        value={calories || ''}
      />
      <label htmlFor="protein">Protein</label>
      <input
        autoCapitalize={'off'}
        autoComplete={'off'}
        autoCorrect={'off'}
        id="protein"
        onChange={(event) => {
          setProtein(event.target.value)
        }}
        placeholder="Protein"
        step="any"
        type="string"
        value={protein || ''}
      />
      <SubmitButton submit={true} />
    </form>
  )
}
