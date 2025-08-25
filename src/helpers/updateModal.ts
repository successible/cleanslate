import { produce } from 'immer'
import type { CleanslateSlices } from '../store/store'

/** Keep a running list of all active modals AND hide/show modals */
export const updateModal = (
  state: Readonly<CleanslateSlices>,
  modal: string,
  shouldOpen: boolean
) => {
  // If the model is already open, do not try to open it again!
  // @ts-expect-error
  if (state.navbar[modal.replace('navbar.', '')] && shouldOpen) return state

  const activeModals = state.navbar.activeModals as string[]
  // If the command is to open the modal, add it to the active list
  // Otherwise, remove it from the array via filtering
  const updatedActiveModals = shouldOpen
    ? [...activeModals, modal]
    : activeModals.filter((name) => name !== modal)

  return produce(state, (draft) => {
    draft.navbar.activeModals = updatedActiveModals
    // @ts-expect-error
    draft.navbar[modal.replace('navbar.', '')] = shouldOpen
  })
}
