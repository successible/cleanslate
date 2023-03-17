import { DELETE_LOGS } from '../../graphql/log'
import { getHasuraClient } from '../getHasuraClient'
import { handleError } from '../handleError'
import { stringifyQuery } from '../stringifyQuery'

export const deleteLogsOnCloud = (
  idsToDelete: string[],
  onSuccess: () => void
) =>
  getHasuraClient()
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
