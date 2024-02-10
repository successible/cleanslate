import { UPDATE_QUICK_LOG } from '../../graphql/quickLog'
import { QuickLog } from '../../models/quickLog'
import { store } from '../../store/store'
import { getHasuraClient } from '../getHasuraClient'
import { handleError } from '../handleError'
import { stringifyQuery } from '../stringifyQuery'

export type UpdateQuickLog = {
  pk_columns: {
    id: string
  }
  set: {
    name: string
    calories: number
    protein: number
  }
}

export const updateQuickLogOnCloud = (
  variables: UpdateQuickLog,
  onSuccess: () => void
) =>
  getHasuraClient()
    .then((client) => {
      client
        .request(stringifyQuery(UPDATE_QUICK_LOG), variables)
        .then((result: { update_quick_logs_by_pk: QuickLog }) => {
          store.dispatch('updateQuickLog', result.update_quick_logs_by_pk)
          onSuccess()
        })
    })
    .catch((error) => handleError(error))
