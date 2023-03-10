import * as Sentry from '@sentry/react'
import { store } from '../store/store'
import { isProduction } from './isProduction'

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
  if (isProduction()) {
    Sentry.setUser({ id: store.get().data.profiles[0].authId })
    Sentry.captureException(error)
  }

  return objectToReturn || 0
}
