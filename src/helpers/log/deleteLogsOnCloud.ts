import { DELETE_LOGS } from '../../graphql/log'
import { store } from '../../store/store'
import { getHasuraClient } from '../getHasuraClient'
import { handleError } from '../handleError'
import { stringifyQuery } from '../stringifyQuery'

type Response = { delete_logs: { returning: { id: string }[] } }

export const deleteLogsOnCloud = (
  idsToDelete: string[],
  onSuccess: () => void
) =>
  getHasuraClient()
    .then((client) => {
      client
        .request(stringifyQuery(DELETE_LOGS), { id: idsToDelete })
        .then((response: Response) => {
          const ids = response.delete_logs.returning.map((o) => o.id)
          store.dispatch('removeLogsById', ids)
          onSuccess()
        })
    })
    .catch((error) => {
      handleError(error)
    })
