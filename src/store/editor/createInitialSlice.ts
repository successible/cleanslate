import type { EditorSlice } from './types'

/** Create the initial state for the editor module */
export const createInitialSlice = (): EditorSlice => {
  return {
    editor: {
      ingredient: null,
    },
  }
}
