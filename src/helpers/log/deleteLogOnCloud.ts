import { DELETE_LOG } from '../../graphql/log'
import { store } from '../../store/store'
import { getHasuraClient } from '../getHasuraClient'
import { handleError } from '../handleError'
import { stringifyQuery } from '../stringifyQuery'

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
