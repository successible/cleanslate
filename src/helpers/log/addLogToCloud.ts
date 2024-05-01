import type { AddLog } from "../../components/standard-adder/helpers/addLog";
import { CREATE_LOG } from "../../graphql/log";
import type { Log } from "../../models/log";
import { store } from "../../store/store";
import { getHasuraClient } from "../getHasuraClient";
import { handleError } from "../handleError";
import { stringifyQuery } from "../stringifyQuery";

export const addLogToCloud = (log: AddLog, onSuccess: () => void) => {
  getHasuraClient()
    .then((client) => {
      client
        .request(stringifyQuery(CREATE_LOG), { object: log })
        .then((result: { insert_logs_one: Log }) => {
          store.dispatch("addLogs", [result.insert_logs_one]);
          onSuccess();
        });
    })
    .catch((error) => {
      handleError(error);
    });
};
