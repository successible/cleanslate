import { DELETE_RECIPE } from "../../graphql/recipe";
import { getHasuraClient } from "../getHasuraClient";
import { handleError } from "../handleError";
import { stringifyQuery } from "../stringifyQuery";

export const deleteRecipeOnCloud = (id: string, onSuccess: () => void) =>
  getHasuraClient()
    .then((client) => {
      client.request(stringifyQuery(DELETE_RECIPE), { id }).then(() => {
        onSuccess();
      });
    })
    .catch((error) => handleError(error));
