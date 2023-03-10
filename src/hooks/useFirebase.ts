import firebase from 'firebase/compat/app'
import React from 'react'
import { getCustomAuth, isCustomUser } from '../helpers/getCustomAuth'
import { validateToken } from '../helpers/validateToken'
import { store } from '../store/store'

export const useFirebase = (offline: boolean) => {
  React.useEffect(() => {
    if (!offline) {
      // This is only useful on development when logging in as a different user
      if (isCustomUser()) {
        store.dispatch('updateUser', getCustomAuth().user)
      } else {
        // The happy path that occurs on production
        firebase.auth().onAuthStateChanged(async (userAuth) => {
          if (userAuth) {
            await validateToken(userAuth)
          }
        })
      }
    }
  }, [offline])
}
