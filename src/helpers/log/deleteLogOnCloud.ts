import { DELETE_LOG } from '../../graphql/log'
import { store } from '../../store/store'
import { getHasuraClient } from '../getHasuraClient'
import { handleError } from '../handleError'
import { stringifyQuery } from '../stringifyQuery'

export const deleteLogOnCloud = (id: string, onSuccess: () => void) => {
  return getHasuraClient()
    .then((client) => {
      client
        .request(stringifyQuery(DELETE_LOG), { id })
        .then((result: { delete_logs_by_pk: { id: string } }) => {
          if (result?.delete_logs_by_pk?.id) {
            store.dispatch('removeLogsById', [result.delete_logs_by_pk.id])
            onSuccess()
          }
        })
    })
    .catch((error) => {
      handleError(error)
    })
}
