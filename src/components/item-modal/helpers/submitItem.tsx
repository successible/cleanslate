import { Unit } from '../../../constants/units'
import { handleError } from '../../../helpers/handleError'
import { prep } from '../../../helpers/prepareFractionalInputForSubmission'
import { Log } from '../../../models/log'
import { AllEvents } from '../../../store/store'
import { Dispatch } from '../../../store/types'
import { CommonItem, OnUpdateItem } from '../../item/types'
import { logOrIngredientUpdateError } from '../../list/Log/LogItem'

export const submitItem = (
  item: CommonItem,
  newAmount: string,
  newUnit: Unit | null,
  dispatch: Dispatch<AllEvents>,
  onUpdate: OnUpdateItem | null
) => {
  const amount = prep(newAmount)
  const { id, type } = item
  if (onUpdate) {
    if (type === 'log') {
      // If the ItemType === log, the return type of onUpdate is a Promise
      // And we should execute code according to success or failure
      type Result = Promise<string | Log>
      const result = onUpdate(id, newUnit, amount, dispatch) as Result
      result
        .then(() => {
          dispatch('closeItemModal')
        })
        .catch((error) => {
          if (logOrIngredientUpdateError.includes(error)) {
            // Do nothing, the error is handled on the client
          } else {
            handleError(error, { showModal: false })
          }
        })
    } else {
      // For any other ItemType the event is synchronous
      // Check CommonItem for the whole description
      onUpdate(id, newUnit, amount, dispatch)
      dispatch('closeItemModal')
    }
  }
}
