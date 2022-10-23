import firebase from 'firebase/compat/app'
import { clearCache } from '../data/clearCache'
import { getStore } from '../data/getStore'
import { isBrowser } from '../data/isBrowser'
import { closeAllModals } from '../ui/closeAllModals'
import { clearLoginState } from './clearLoginState'

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
      window.alert("You've been logged out!")
    }
  } catch (error) {
    console.log(error)
  }
}
