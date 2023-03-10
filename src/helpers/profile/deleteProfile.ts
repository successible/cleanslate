import { getAuth } from 'firebase/auth'
import toast from 'react-hot-toast'
import { DELETE_PROFILE } from '../../graphql/profile'
import { Profile } from '../../models/profile'
import { firebaseApp } from '../../pages'
import { getHasuraClient } from '../getHasuraClient'
import { handleError } from '../handleError'
import { logout } from '../logout'
import { stringifyQuery } from '../stringifyQuery'

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
      const auth = getAuth(firebaseApp)
      await auth.currentUser?.delete()
      toast.success('Your account has been deleted!')
      await logout(false)
    }
  } catch (error) {
    handleError(error as Error)
  }
}
