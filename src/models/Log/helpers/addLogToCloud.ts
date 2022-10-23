import { AddLog } from '../../../components/standard-editor/helpers/addLog'
import { assembleLog } from '../../../components/standard-editor/helpers/assembleLog'
import { getHasuraClient } from '../../../helpers/data/getHasuraClient'
import { handleError } from '../../../helpers/data/handleError'
import { stringifyQuery } from '../../../helpers/data/stringifyQuery'
import { store } from '../../../store/store'
import { CREATE_LOG } from '../schema'

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
