import { DELETE_WATER_LOG } from '../../graphql/waterLog'
import { store } from '../../store/store'
import { getHasuraClient } from '../getHasuraClient'
import { handleError } from '../handleError'
import { stringifyQuery } from '../stringifyQuery'

export const deleteWaterLogOnCloud = (id: string, onSuccess: () => void) => {
  return getHasuraClient()
    .then((client) => {
      client
        .request(stringifyQuery(DELETE_WATER_LOG), { id })
        .then((result: { delete_water_logs_by_pk: { id: string } }) => {
          store.dispatch('removeWaterLogsById', [
            result.delete_water_logs_by_pk.id,
          ])
          onSuccess()
        })
    })
    .catch((error) => {
      handleError(error)
    })
}
