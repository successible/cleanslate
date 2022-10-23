import { getHasuraClient } from '../../../helpers/data/getHasuraClient'
import { handleError } from '../../../helpers/data/handleError'
import { stringifyQuery } from '../../../helpers/data/stringifyQuery'
import { store } from '../../../store/store'
import { DELETE_LOGS } from '../schema'

export const deleteLogsOnCloud = (
  idsToDelete: string[],
  onSuccess: () => void
) =>
  getHasuraClient(() => {
    store.dispatch('deleteLogs', idsToDelete)
  })
    .then((client) => {
      client
        .request(stringifyQuery(DELETE_LOGS), { id: idsToDelete })
        .then(() => {
          onSuccess()
        })
    })
    .catch((error) => {
      handleError(error)
    })
