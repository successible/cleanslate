import { AddLog } from '../../components/standard-adder/helpers/addLog'
import { assembleLog } from '../../components/standard-adder/helpers/assembleLog'
import { CREATE_LOG } from '../../graphql/log'
import { store } from '../../store/store'
import { getHasuraClient } from '../getHasuraClient'
import { handleError } from '../handleError'
import { stringifyQuery } from '../stringifyQuery'

export const addLogToCloud = (log: AddLog, onSuccess: () => void) => {
  getHasuraClient(() => {
    store.dispatch('addLogs', [
      assembleLog(log.alias, log.amount, log.unit, log.recipe, log.food),
    ])
  })
    .then((client) => {
      client.request(stringifyQuery(CREATE_LOG), { object: log }).then(() => {
        onSuccess()
      })
    })
    .catch((error) => {
      handleError(error)
    })
}
