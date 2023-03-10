import { createWebsocketClient } from './createWebsocketClient'
import { getStore } from './getStore'

/** Create the Websocket Client with the JWT. */
export const getWebsocketClient = async () => {
  const store = getStore()
  const currentClient = store.get().currentWebsocketClient
  if (currentClient) {
    // Do nothing, reuse the existing client
    return currentClient
  } else {
    const client = createWebsocketClient()
    store.dispatch('updateCurrentWebsocketClient', client)
    return client
  }
}
