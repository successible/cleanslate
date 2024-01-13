import {
  createKeyboardShortcutDirectory,
  Key,
  KeyboardShortcutKeys,
} from './createShortcuts'
import { modalsAreActive } from './modalsAreActive'

/** Add the global keyboard shortcut handling functions to the window */
export const executeKeyboardShortcuts = (event: KeyboardEvent) => {
  const key = event.key as Key
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
}
