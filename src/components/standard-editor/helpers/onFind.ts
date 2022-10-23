import { Food } from '../../../models/Food/model'
import { Recipe } from '../../../models/Recipes/model'
import { AllEvents } from '../../../store/store'
import { Dispatch } from '../../../store/types'

export const onFind = (
  result: Food | Recipe,
  dispatch: Dispatch<AllEvents>
) => {
  if (result.isDummy) {
    dispatch('saveDummyFood', result)
  } else {
    dispatch('saveSearchResult', result)
    dispatch('saveDummyFood', null)
  }
}
