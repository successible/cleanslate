import { CREATE_EXERCISE_LOG } from '../../graphql/exerciseLog'
import type { ExerciseData, ExerciseLog } from '../../models/exerciseLog'
import { store } from '../../store/store'
import { getHasuraClient } from '../getHasuraClient'
import { handleError } from '../handleError'
import { stringifyQuery } from '../stringifyQuery'

export const addExerciseLogToCloud = (data: ExerciseData) => {
  getHasuraClient()
    .then((client) => {
      client
        .request(stringifyQuery(CREATE_EXERCISE_LOG), {
          object: { ...data },
        })
        .then((result: { insert_exercise_logs_one: ExerciseLog }) => {
          store.dispatch('addExerciseLogs', [result.insert_exercise_logs_one])
          store.dispatch('closeExerciseModal')
        })
    })
    .catch((error) => {
      handleError(error)
    })
}
