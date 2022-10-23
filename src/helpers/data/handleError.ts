import Honeybadger from '@honeybadger-io/js'
import { store } from '../../store/store'
import { isProduction } from '../ui/isProduction'
import { dispatchError } from './dispatchError'

export const handleError = (
  error: Error | string,
  options: {
    showModal?: boolean
    objectToReturn?: 0
    params?: Record<string, any>
  } = { objectToReturn: 0, params: {}, showModal: true }
) => {
  const { objectToReturn, params, showModal } = options
  const message = typeof error === 'string' ? error : error?.message

  const ignoreMessage =
    message.includes('Network Error') ||
    message.includes('Offline') ||
    // Only occurs when the websocket drops and tries to reconnect after bad Internet
    // Thus, this is just another type of network error
    message.includes('an operation already exists with this id') ||
    // Only occurs when the JWT fetch fails because of a network error
    // Thus, this is just another type of network error
    message.includes('before the connection is initialised') ||
    // Another type of network error, unique to axios
    message.includes('timeout of 0ms exceeded') ||
    // Another type of network error, unique to Firebase
    message.includes('network AuthError') ||
    // Another type of network error, unique to Firebase
    message.includes('auth/timeout') ||
    // Another Firebase error I don't care about
    message.includes(
      'This operation has been cancelled due to another conflicting popup being opened.'
    )

  if (showModal && ignoreMessage === false) {
    // Open the Error.tsx UI...
    dispatchError(message || error)
  }

  // Log stuff
  console.log(error)
  if (isProduction() && ignoreMessage === false) {
    Honeybadger.notify(error, {
      params: { ...params, data: store.get().data.profiles },
    })
  }

  return objectToReturn || 0
}
