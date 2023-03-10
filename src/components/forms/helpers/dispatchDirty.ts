import { Form } from '../../../store/navbar/types'
import { store } from '../../../store/store'

// Only update the global store
export const dispatchDirty = (localIsDirty: boolean, form: Form) => {
  const storeIsDirty = store.get().navbar.isDirty[form]
  if (storeIsDirty !== localIsDirty) {
    store.dispatch('updateIsDirty', [form, localIsDirty])
  }
}
