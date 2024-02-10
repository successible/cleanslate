import { DELETE_EXERCISE_LOG } from '../../graphql/exerciseLog'
import { store } from '../../store/store'
import { getHasuraClient } from '../getHasuraClient'
import { handleError } from '../handleError'
import { stringifyQuery } from '../stringifyQuery'

export const deleteExerciseLogOnCloud = (id: string, onSuccess: () => void) => {
  return getHasuraClient()
    .then((client) => {
      client
        .request(stringifyQuery(DELETE_EXERCISE_LOG), { id })
        .then((result: { delete_exercise_logs_by_pk: { id: string } }) => {
          store.dispatch('removeExerciseLogsById', [
            result.delete_exercise_logs_by_pk.id,
          ])
          onSuccess()
        })
    })
    .catch((error) => {
      handleError(error)
    })
}
