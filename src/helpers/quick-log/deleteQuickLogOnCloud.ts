import { DELETE_QUICK_LOG } from "../../graphql/quickLog";
import { store } from "../../store/store";
import { getHasuraClient } from "../getHasuraClient";
import { handleError } from "../handleError";
import { stringifyQuery } from "../stringifyQuery";

export const deleteQuickLogOnCloud = (id: string, onSuccess: () => void) => {
  return getHasuraClient()
    .then((client) => {
      client
        .request(stringifyQuery(DELETE_QUICK_LOG), { id })
        .then((result: { delete_quick_logs_by_pk: { id: string } }) => {
          store.dispatch("removeQuickLogsById", [
            result.delete_quick_logs_by_pk.id,
          ]);
          onSuccess();
        });
    })
    .catch((error) => {
      handleError(error);
    });
};
