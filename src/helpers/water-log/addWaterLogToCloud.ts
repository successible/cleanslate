import { CREATE_WATER_LOG } from '../../graphql/waterLog'
import type { WaterLog } from '../../models/waterLog'
import { store } from '../../store/store'
import { getHasuraClient } from '../getHasuraClient'
import { handleError } from '../handleError'
import { stringifyQuery } from '../stringifyQuery'

export const addWaterLogToCloud = (amount: number, unit: 'mL' | 'oz') => {
  getHasuraClient()
    .then((client) => {
      client
        .request(stringifyQuery(CREATE_WATER_LOG), {
          object: { amount, unit },
        })
        .then((result: { insert_water_logs_one: WaterLog }) => {
          store.dispatch('addWaterLogs', [result.insert_water_logs_one])
          store.dispatch('closeWaterAddModal')
        })
    })
    .catch((error) => {
      handleError(error)
    })
}
