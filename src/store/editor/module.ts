import dotProp from 'dot-prop-immutable'
import { StoreonModule } from 'storeon'
import { CleanslateSlices } from '../store'
import { createInitialSlice } from './createInitialSlice'
import { EditorEvents } from './types'

export const editor: StoreonModule<CleanslateSlices, EditorEvents> = (
  store
) => {
  store.on('@init', () => createInitialSlice())

  store.on('saveIngredient', (state, event) => {
    const s1 = dotProp.set(state, 'editor.ingredient', event)
    return s1
  })

  store.on('clearEditor', (state) => {
    const s1 = dotProp.set(state, 'editor.searchResult', null)
    const s2 = dotProp.set(s1, 'editor.dummyFood', null)
    const s3 = dotProp.set(s2, 'editor.ingredient', null)
    return s3
  })
}
