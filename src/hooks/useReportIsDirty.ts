import React from 'react'
import { dispatchDirty } from '../components/forms/helpers/dispatchDirty'
import { formIsEmpty } from '../components/forms/helpers/formIsEmpty'
import { formIsEqual } from '../components/forms/helpers/formIsEqual'
import { Food } from '../models/food'
import { Recipe } from '../models/recipe'
import { Form } from '../store/navbar/types'

export const useReportIsDirty = (
  item: Food | Recipe | undefined | null,
  state: Record<string, any>,
  form: Form
) => {
  React.useEffect(() => {
    if (item) {
      dispatchDirty(formIsEqual(state, item), form)
    } else {
      dispatchDirty(formIsEmpty(state), form)
    }
  }, [state, item, form])
}
