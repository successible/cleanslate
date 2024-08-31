import { produce } from 'immer'
import type { StoreonModule } from '../../storeon'
import type { CleanslateSlices } from '../store'
import { createInitialSlice } from './createInitialSlice'
import type { EditorEvents } from './types'

export const editor: StoreonModule<CleanslateSlices, EditorEvents> = (
  store
) => {
  store.on('@init', () => createInitialSlice())

  store.on('saveIngredient', (state, event) => {
    return produce(state, (draft) => {
      draft.editor.ingredient = event
    })
  })
}
