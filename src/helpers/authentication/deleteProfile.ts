import { Profile } from '../../models/Profile/model'
import { DELETE_PROFILE } from '../../models/Profile/schema'
import { getHasuraClient } from '../data/getHasuraClient'
import { handleError } from '../data/handleError'
import { stringifyQuery } from '../data/stringifyQuery'

export const deleteAccountConfirmation =
  'Are you sure you want to delete your account? All your data will be permanently deleted. This cannot be undone!'

export const deleteProfile = async (profile: Profile) => {
  try {
    const ok = window.confirm(deleteAccountConfirmation)
    if (ok) {
      const client = await getHasuraClient()
      await client.request(stringifyQuery(DELETE_PROFILE), {
        authId: profile.authId,
      })
    }
  } catch (error) {
    handleError(error as Error)
  }
}
