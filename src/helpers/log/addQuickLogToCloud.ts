import { QuickAddUnit } from '../../constants/units'
import { CREATE_LOGS } from '../../graphql/log'
import { Log } from '../../models/log'
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

type Response = { insert_logs: { returning: Log[] } }

export const addQuickLogToCloud = (
  variables: AddQuickLog,
  enablePlanning: boolean,
  onSuccess: () => void
) =>
  getHasuraClient()
    .then((client) => {
      client
        .request(stringifyQuery(CREATE_LOGS), variables)
        .then((response: Response) => {
          const logs = response.insert_logs.returning
          store.dispatch('addLogs', logs)
          onSuccess()
        })
    })
    .catch((error) => {
      handleError(error)
    })
