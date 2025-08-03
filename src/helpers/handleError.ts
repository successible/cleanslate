import * as Sentry from '@sentry/react'
import { toast } from 'react-toastify'
import { store } from '../store/store'
import { logout } from './logout'
import { dsn } from './startSentry'

export const handleError = (
  error: unknown,
  options: {
    showModal?: boolean
    hideFromSentry?: boolean
    objectToReturn?: 0
    params?: Record<string, any>
  } = { objectToReturn: 0, params: {}, showModal: true }
) => {
  const { hideFromSentry, objectToReturn } = options
  const e = String(error)
  const sameEmail = 'An account already exists with the same email address'
  const logoutMessage = 'Your login has expired. Please login again.'
  if (e.includes('foods_profile_name_key')) {
    toast.error('Custom food with that name already exists!')
  } else if (e.includes('recipes_profile_name_key')) {
    toast.error('Recipe with that name already exists!')
  } else if (e.includes(sameEmail)) {
    toast.error(sameEmail)
  } else if (
    e.includes('JWT') ||
    e.includes('Cannot read properties of undefined (reading') ||
    e.includes('the operation is insecure') ||
    // Example: undefined is not an object (evaluating 'e.insert_logs.returning')
    e.includes('e.insert_logs.returning')
  ) {
    toast.error(logoutMessage)
    logout(false)
    return 0
  } else {
    // Do nothing
  }

  if (dsn && dsn !== 'no' && hideFromSentry !== true) {
    try {
      Sentry.setUser({ id: store.get().data.profiles[0].authId })
    } catch (_e) {
      console.log('Storeon is not configured yet. Skipping...')
    }
    Sentry.setExtra('version', process.env.NEXT_PUBLIC_VERSION || 'Unknown')
    Sentry.captureException(error)
  }
  return objectToReturn || 0
}
