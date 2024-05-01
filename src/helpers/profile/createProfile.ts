import { getHasuraClient } from "../getHasuraClient";
import { getUser } from "../getUser";
import { gql } from "../gql";
import { handleError } from "../handleError";
import { logout } from "../logout";

export const createProfileMutation = async (
  authId: string,
  timezone: string,
) => {
  const mutation = gql`
    mutation UPSERT_PROFILE($authId: String!, $timezone: String!) {
      insert_profiles(
        objects: [{ authId: $authId, timezone: $timezone }]
        on_conflict: { constraint: profiles_authId_key, update_columns: [] }
      ) {
        affected_rows
      }
    }
  `;
  try {
    const response = await (await getHasuraClient()).request(mutation, {
      authId,
      timezone,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const createProfile = async () => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const user = await getUser();
    if (user) {
      if ("token" in user) {
        logout();
      } else {
        const authId = await user.uid;
        const provider = user.providerData[0];
        if (provider) {
          await createProfileMutation(authId, timezone);
        }
      }
    }
  } catch (error) {
    return handleError(error as Error);
  }
};
