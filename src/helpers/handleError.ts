import * as Sentry from '@sentry/react'
import { toast } from 'react-hot-toast'
import { store } from '../store/store'
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
  const sameEmail = 'An account already exists with the same email address'
  if (String(error).includes('foods_profile_name_key')) {
    toast.error('Custom food with that name already exists!')
  } else if (String(error).includes('recipes_profile_name_key')) {
    toast.error('Recipe with that name already exists!')
  } else if (String(error).includes(sameEmail)) {
    toast.error(sameEmail)
  }
  if (dsn) {
    try {
      Sentry.setUser({ id: store.get().data.profiles[0].authId })
    } catch (e) {
      console.log('Storeon not configured yet. Skipping.')
    }
    Sentry.captureException(error)
  }
  return objectToReturn || 0
}
