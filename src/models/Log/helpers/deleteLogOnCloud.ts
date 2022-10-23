import { getHasuraClient } from '../../../helpers/data/getHasuraClient'
import { handleError } from '../../../helpers/data/handleError'
import { stringifyQuery } from '../../../helpers/data/stringifyQuery'
import { store } from '../../../store/store'
import { DELETE_LOG } from '../schema'

export const deleteLogOnCloud = (id: string, onSuccess: () => void) => {
  return getHasuraClient(() => {
    store.dispatch('deleteLogs', [id])
  })
    .then((client) => {
      client.request(stringifyQuery(DELETE_LOG), { id }).then(() => {
        onSuccess()
      })
    })
    .catch((error) => {
      handleError(error)
    })
}
