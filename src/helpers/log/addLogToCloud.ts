import { AddLog } from '../../components/standard-adder/helpers/addLog'
import { CREATE_LOG } from '../../graphql/log'
import { getHasuraClient } from '../getHasuraClient'
import { handleError } from '../handleError'
import { stringifyQuery } from '../stringifyQuery'

export const addLogToCloud = (log: AddLog, onSuccess: () => void) => {
  getHasuraClient()
    .then((client) => {
      client.request(stringifyQuery(CREATE_LOG), { object: log }).then(() => {
        onSuccess()
      })
    })
    .catch((error) => {
      handleError(error)
    })
}
