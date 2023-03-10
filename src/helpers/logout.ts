import firebase from 'firebase/compat/app'
import toast from 'react-hot-toast'
import { clearCache } from './clearCache'
import { clearLoginState } from './clearLoginState'
import { closeAllModals } from './closeAllModals'
import { getStore } from './getStore'
import { isBrowser } from './isBrowser'

export const logout = async (alert = true) => {
  // This resets the logged-in flag
  if (isBrowser()) {
    clearCache()
    clearLoginState()
  }

  // Close the Websocket connections to save bandwidth
  const store = getStore()
  const client = store.get().currentWebsocketClient
  if (client) {
    client.unsubscribeAll()
    client.close(true, true)
  }
  try {
    // Log out of Firebase
    await firebase.auth().signOut()
    closeAllModals()
    store.dispatch('updateUser', null)
    if (isBrowser() && alert) {
      toast.success("You've been logged out!")
    }
  } catch (error) {
    console.log(error)
  }
}
