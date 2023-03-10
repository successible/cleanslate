import { closeAllModals } from './closeAllModals'
import {
  createKeyboardShortcutDirectory,
  Key,
  KeyboardShortcutKeys,
} from './createShortcuts'
import { getStore } from './getStore'
import { modalsAreActive } from './modalsAreActive'

/** Add the global keyboard shortcut handling functions to the window */
export const executeKeyboardShortcuts = (event: KeyboardEvent) => {
  const key = event.key as Key
  const store = getStore()
  const dispatch = store.dispatch
  if (modalsAreActive()) {
    // Do nothing
  } else {
    const keyboardShortcutDirectory = createKeyboardShortcutDirectory()
    const action: () => void | undefined =
      keyboardShortcutDirectory[key as KeyboardShortcutKeys]
    if (action && key !== 'Escape') {
      action()
    }
  }
  // Close all modals by pressing ESC
  if (key === 'Escape') {
    closeAllModals()
    dispatch('clearEditor')
  }
}
