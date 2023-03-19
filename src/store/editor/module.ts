import reduce from 'immer'
import { StoreonModule } from 'storeon'
import { CleanslateSlices } from '../store'
import { createInitialSlice } from './createInitialSlice'
import { EditorEvents } from './types'

export const editor: StoreonModule<CleanslateSlices, EditorEvents> = (
  store
) => {
  store.on('@init', () => createInitialSlice())

  store.on('saveIngredient', (state, event) => {
    return reduce(state, (draft) => {
      draft.editor.ingredient = event
    })
  })
}
