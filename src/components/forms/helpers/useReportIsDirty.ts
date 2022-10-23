import React from 'react'
import { Food } from '../../../models/Food/model'
import { Recipe } from '../../../models/Recipes/model'
import { Form } from '../../../store/navbar/types'
import { dispatchDirty } from './dispatchDirty'
import { formIsEmpty } from './formIsEmpty'
import { formIsEqual } from './formIsEqual'

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
