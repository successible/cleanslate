import { assembleLog } from '../../../components/standard-editor/helpers/assembleLog'
import { getHasuraClient } from '../../../helpers/data/getHasuraClient'
import { handleError } from '../../../helpers/data/handleError'
import { stringifyQuery } from '../../../helpers/data/stringifyQuery'
import { store } from '../../../store/store'
import { CREATE_LOGS } from '../schema'
import { QuickAddUnit } from '../types'

export type AddQuickLog = {
  objects: {
    amount: number
    unit: QuickAddUnit
  }[]
}

export const addQuickLogToCloud = (
  variables: AddQuickLog,
  onSuccess: () => void
) =>
  getHasuraClient(() => {
    const logs = variables.objects.map((log) =>
      assembleLog(null, log.amount, log.unit)
    )
    store.dispatch('addLogs', logs)
  })
    .then((client) => {
      client.request(stringifyQuery(CREATE_LOGS), variables).then(() => {
        onSuccess()
      })
    })
    .catch((error) => {
      handleError(error)
    })
