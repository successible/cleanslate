import { assembleLog } from '../../components/standard-adder/helpers/assembleLog'
import { QuickAddUnit } from '../../constants/units'
import { CREATE_LOGS } from '../../graphql/log'
import { store } from '../../store/store'
import { getHasuraClient } from '../getHasuraClient'
import { handleError } from '../handleError'
import { stringifyQuery } from '../stringifyQuery'

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
