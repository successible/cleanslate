import firebase from 'firebase/compat/app'
import React from 'react'
import { firebaseEnabled } from '../helpers/getFirebaseConfig'
import { getStore } from '../helpers/getStore'
import { getToken } from '../helpers/getToken'
import { validateToken } from '../helpers/validateToken'

export const useAuthentication = (offline: boolean) => {
  React.useEffect(() => {
    if (!offline && firebaseEnabled) {
      // The happy path that occurs on production
      firebase.auth().onAuthStateChanged(async (userAuth) => {
        if (userAuth) {
          await validateToken(userAuth)
        }
      })
    } else {
      if (getToken()) {
        getStore().dispatch('updateUser', { token: getToken() })
      }
    }
  }, [offline])
}
