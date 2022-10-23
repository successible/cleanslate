import { getHasuraClient } from '../../../helpers/data/getHasuraClient'
import { handleError } from '../../../helpers/data/handleError'
import { stringifyQuery } from '../../../helpers/data/stringifyQuery'
import { DELETE_FOOD } from '../schema'

export const deleteFoodOnCloud = (id: string, onSuccess: () => void) =>
  getHasuraClient()
    .then((client) => {
      client.request(stringifyQuery(DELETE_FOOD), { id }).then(() => {
        onSuccess()
      })
    })
    .catch((error) => handleError(error))
