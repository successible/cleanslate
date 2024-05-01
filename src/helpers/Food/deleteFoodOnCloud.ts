import { DELETE_FOOD } from "../../graphql/food";
import { getHasuraClient } from "../getHasuraClient";
import { handleError } from "../handleError";
import { stringifyQuery } from "../stringifyQuery";

export const deleteFoodOnCloud = (id: string, onSuccess: () => void) =>
  getHasuraClient()
    .then((client) => {
      client.request(stringifyQuery(DELETE_FOOD), { id }).then(() => {
        onSuccess();
      });
    })
    .catch((error) => handleError(error));
