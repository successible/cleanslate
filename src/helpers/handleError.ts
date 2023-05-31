import * as Sentry from '@sentry/react'
import { toast } from 'react-hot-toast'
import { store } from '../store/store'
import { logout } from './logout'
import { dsn } from './startSentry'

export const handleError = (
  error: Error | string,
  options: {
    showModal?: boolean
    objectToReturn?: 0
    params?: Record<string, any>
  } = { objectToReturn: 0, params: {}, showModal: true }
) => {
  const { objectToReturn } = options
  console.log(error)
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
    // Example: (reading 'insert_logs_one')
    e.includes('Cannot read properties of undefined (reading') ||
    e.includes('SecurityError: The operation is insecure')
  ) {
    toast.error(logoutMessage)
    logout(false)
    return 0
  }

  if (dsn) {
    try {
      Sentry.setUser({ id: store.get().data.profiles[0].authId })
    } catch (e) {
      console.log('Storeon not configured yet. Skipping.')
    }
    Sentry.setExtra('version', process.env.NEXT_PUBLIC_VERSION || 'Unknown')
    Sentry.captureException(error)
  }
  return objectToReturn || 0
}
