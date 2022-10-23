import { getHasuraClient } from '../../../helpers/data/getHasuraClient'
import { handleError } from '../../../helpers/data/handleError'
import { stringifyQuery } from '../../../helpers/data/stringifyQuery'
import { UPDATE_LOG } from '../schema'
import { Unit } from '../types'

export type UpdateLog = {
  pk_columns: {
    id: string
  }
  set: {
    unit: Unit
    amount: number
  }
}

export const updateLogOnCloud = (variables: UpdateLog, onSuccess: () => void) =>
  getHasuraClient()
    .then((client) => {
      client.request(stringifyQuery(UPDATE_LOG), variables).then(() => {
        onSuccess()
      })
    })
    .catch((error) => handleError(error))
