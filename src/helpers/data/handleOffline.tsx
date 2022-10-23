import React from 'react'
import { store } from '../../store/store'

export const handleOffline = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    window.addEventListener('offline', () => {
      store.dispatch('isOffline', true)
    })
    window.addEventListener('online', () => {
      store.dispatch('isOffline', false)
    })
  }, [])
}
