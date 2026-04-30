import { UPDATE_WATER_LOG } from '../../graphql/waterLog'
import type { WaterLog } from '../../models/waterLog'
import { store } from '../../store/store'
import { getHasuraClient } from '../getHasuraClient'
import { handleError } from '../handleError'
import { stringifyQuery } from '../stringifyQuery'

export type UpdateWaterLog = {
  pk_columns: {
    id: string
  }
  set: {
    amount: number
    unit: 'mL' | 'oz'
  }
}

export const updateWaterLogOnCloud = (
  variables: UpdateWaterLog,
  onSuccess: () => void
) =>
  getHasuraClient()
    .then((client) => {
      client
        .request(stringifyQuery(UPDATE_WATER_LOG), variables)
        .then((result: { update_water_logs_by_pk: WaterLog }) => {
          store.dispatch('updateWaterLog', result.update_water_logs_by_pk)
          onSuccess()
        })
    })
    .catch((error) => handleError(error))
