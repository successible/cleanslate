import { QuickAddUnit } from '../../constants/units'
import { CREATE_LOGS } from '../../graphql/log'
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
  enablePlanning: boolean,
  onSuccess: () => void
) =>
  getHasuraClient()
    .then((client) => {
      client.request(stringifyQuery(CREATE_LOGS), variables).then(() => {
        onSuccess()
      })
    })
    .catch((error) => {
      handleError(error)
    })
