import { getHasuraClient } from '../../../helpers/data/getHasuraClient'
import { handleError } from '../../../helpers/data/handleError'
import { stringifyQuery } from '../../../helpers/data/stringifyQuery'
import { DELETE_RECIPE } from '../schema'

export const deleteRecipeOnCloud = (id: string, onSuccess: () => void) =>
  getHasuraClient()
    .then((client) => {
      client.request(stringifyQuery(DELETE_RECIPE), { id }).then(() => {
        onSuccess()
      })
    })
    .catch((error) => handleError(error))
