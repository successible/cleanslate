import { CREATE_QUICK_LOG } from '../../graphql/quickLog'
import type { QuickLog } from '../../models/quickLog'
import { store } from '../../store/store'
import { getHasuraClient } from '../getHasuraClient'
import { handleError } from '../handleError'
import { stringifyQuery } from '../stringifyQuery'

export const addQuickLogToCloud = (
  name: string,
  calories: number,
  protein: number
) => {
  getHasuraClient()
    .then((client) => {
      client
        .request(stringifyQuery(CREATE_QUICK_LOG), {
          object: { calories, name, protein },
        })
        .then((result: { insert_quick_logs_one: QuickLog }) => {
          store.dispatch('addQuickLogs', [result.insert_quick_logs_one])
          store.dispatch('closeQuickAddModal')
        })
    })
    .catch((error) => {
      handleError(error)
    })
}
