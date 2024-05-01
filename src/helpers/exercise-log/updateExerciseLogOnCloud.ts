import { UPDATE_EXERCISE_LOG } from "../../graphql/exerciseLog";
import type { ExerciseData, ExerciseLog } from "../../models/exerciseLog";
import { store } from "../../store/store";
import { getHasuraClient } from "../getHasuraClient";
import { handleError } from "../handleError";
import { stringifyQuery } from "../stringifyQuery";

export type UpdateExerciseLog = {
  pk_columns: {
    id: string;
  };
  set: ExerciseData;
};

export const updateExerciseLogOnCloud = (
  variables: UpdateExerciseLog,
  onSuccess: () => void,
) =>
  getHasuraClient()
    .then((client) => {
      client
        .request(stringifyQuery(UPDATE_EXERCISE_LOG), variables)
        .then((result: { update_exercise_logs_by_pk: ExerciseLog }) => {
          store.dispatch(
            "updateExerciseLog",
            result.update_exercise_logs_by_pk,
          );
          onSuccess();
        });
    })
    .catch((error) => handleError(error));
