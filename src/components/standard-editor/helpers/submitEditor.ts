import { addIngredient } from '../../../models/Ingredient/helpers/addIngredient'
import { Barcode } from '../../../models/Log/model'
import { Unit } from '../../../models/Log/types'
import { DataEvents } from '../../../store/data/types'
import { EditorEvents, SearchResult } from '../../../store/editor/types'
import { NavbarEvents } from '../../../store/navbar/types'
import { Dispatch } from '../../../store/types'
import { spawnAlert } from '../../alert/helpers/spawnAlert'
import { EditorType } from '../StandardEditor'
import { addLog } from './addLog'

/** Take the input for the Standard Editor form and dispatch the addLog/addIngredient function */
export const submitEditor = (
  type: EditorType,
  alias: string | null,
  amount: number | null,
  unit: Unit | null,
  barcode: Barcode | null,
  dispatch: Dispatch<
    keyof DataEvents | keyof NavbarEvents | keyof EditorEvents
  >,
  searchResult?: SearchResult
) => {
  if (!amount) {
    spawnAlert('Please specify a valid amount', 'danger')
  } else if (!unit) {
    spawnAlert('Please specify a valid unit', 'danger')
  } else {
    // If the barcode is present, a food or recipe can be skipped.
    if (!searchResult && !barcode) {
      return spawnAlert('Please specify a valid food or recipe', 'danger')
    }
    if (type === 'log') {
      const id = searchResult ? searchResult.id : undefined
      const type = searchResult ? searchResult.type : 'food'
      addLog(dispatch, alias, amount, unit, barcode, id, type)
    } else {
      if (!searchResult) {
        return spawnAlert('Please specify a valid food or recipe', 'danger')
      }
      const ingredient = addIngredient(searchResult, amount, unit)
      dispatch('saveIngredient', ingredient)
    }
  }
}
