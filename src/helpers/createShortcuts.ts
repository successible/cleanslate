import { getStore } from './getStore'

export type KeyboardShortcutKeys = 'b' | 'e' | 'f' | 'h' | 'l' | 'm' | 'q' | 'r'

export type Key =
  | 'Backspace'
  | 'Tab'
  | 'Enter'
  | 'Shift'
  | 'Control'
  | 'Alt'
  | 'CapsLock'
  | 'Escape'
  | ' '
  | 'PageUp'
  | 'PageDown'
  | 'End'
  | 'Home'
  | 'ArrowLeft'
  | 'ArrowUp'
  | 'ArrowRight'
  | 'ArrowDown'
  | 'Left'
  | 'Up'
  | 'Right'
  | 'Down'
  | 'Insert'
  | 'Delete'
  | '0'
  | ')'
  | '1'
  | '!'
  | '2'
  | '@'
  | '3'
  | '£'
  | '#'
  | '4'
  | '$'
  | '5'
  | '%'
  | '6'
  | '^'
  | '^'
  | '7'
  | '&'
  | '8'
  | '*'
  | '*'
  | '9'
  | '('
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z'
  | 'Meta'
  | 'Meta'
  | 'Meta'
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '*'
  | '+'
  | '-'
  | '.'
  | 'Decimal'
  | '/'
  | 'F1'
  | 'F2'
  | 'F3'
  | 'F4'
  | 'F5'
  | 'F6'
  | 'F7'
  | 'F8'
  | 'F9'
  | 'F10'
  | 'F11'
  | 'F12'
  | 'NumLock'
  | 'ScrollLock'
  | ';'
  | '='
  | ','
  | '-'
  | '.'
  | '_'
  | '+'
  | '/'
  | '~'
  | '`'
  | '['
  | ']'

/** Create the object mapping the key pressed to the dispatcher */
export const createKeyboardShortcutDirectory = () => {
  const dispatch = getStore().dispatch
  const keyboardShortcutDirectory: Record<KeyboardShortcutKeys, () => void> = {
    b: () => {
      dispatch('openBarcodeModal', 'log')
    },
    e: () => {
      dispatch('openExerciseModal', null)
    },
    f: () => {
      dispatch('openFoodModal')
    },
    h: () => {
      dispatch('openHelpModal')
    },
    l: () => {
      dispatch('openModal')
    },
    m: () => {
      dispatch('openMenu')
    },
    q: () => {
      dispatch('openQuickAddModal')
    },
    r: () => {
      dispatch('openRecipeModal')
    },
  }
  return keyboardShortcutDirectory
}
