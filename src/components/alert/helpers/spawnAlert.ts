/** Create an HTML alert with vanilla JavaScript */
import { getStore } from '../../../helpers/data/getStore'

export type AlertType = 'success' | 'danger'
export type AlertPayload = {
  message: string
  type: AlertType
}

export const spawnAlert = (
  message: string,
  type: AlertType,
  callback = () => {},
  timeout: null | number = 10000
) => {
  const store = getStore()
  store.dispatch('openAlert', { message, type })
  if (timeout !== null) {
    setTimeout(() => {
      store.dispatch('closeAlert')
      callback()
    }, timeout)
  }
}
