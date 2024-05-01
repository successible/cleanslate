import type { Unit } from "../../constants/units";
import { UPDATE_LOG } from "../../graphql/log";
import type { Log } from "../../models/log";
import { store } from "../../store/store";
import { getHasuraClient } from "../getHasuraClient";
import { handleError } from "../handleError";
import { stringifyQuery } from "../stringifyQuery";

export type UpdateLog = {
  pk_columns: {
    id: string;
  };
  set: {
    unit: Unit;
    amount: number;
    consumed: boolean;
  };
};

export const updateLogOnCloud = (variables: UpdateLog, onSuccess: () => void) =>
  getHasuraClient()
    .then((client) => {
      client
        .request(stringifyQuery(UPDATE_LOG), variables)
        .then((result: { update_logs_by_pk: Log }) => {
          store.dispatch("updateLog", result.update_logs_by_pk);
          onSuccess();
        });
    })
    .catch((error) => handleError(error));
