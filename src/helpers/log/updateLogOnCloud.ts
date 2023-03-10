import { Unit } from '../../constants/units'
import { UPDATE_LOG } from '../../graphql/log'
import { getHasuraClient } from '../getHasuraClient'
import { handleError } from '../handleError'
import { stringifyQuery } from '../stringifyQuery'

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
