import toast from 'react-hot-toast'
import { store } from '../store/store'
import { closeAllModals } from './closeAllModals'
import { isOffline } from './isOffline'

export const offlineMessage =
  'Your device currently has no Internet connection. Please try again when you reconnect!'

export type Request = (
  query: string,
  variables?: Record<string, any>,
  headers?: Record<string, any>
) => Promise<any>

export type Client = {
  request: Request
}

export type PendingClient = Promise<Client>

export const stopRequestIfOffline = async (
  showMessage = true,
  closeModals = true
) => {
  if (isOffline()) {
    closeModals ? closeAllModals() : store.dispatch('closeError')
    showMessage && toast.error(offlineMessage)
    throw new Error('You are offline!')
  } else {
    return 'You are online!'
  }
}
