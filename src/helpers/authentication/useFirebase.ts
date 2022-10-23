import firebase from 'firebase/compat/app'
import React from 'react'
import { validateToken } from './validateToken'

export const useFirebase = (offline: boolean) => {
  React.useEffect(() => {
    if (!offline) {
      firebase.auth().onAuthStateChanged(async (userAuth) => {
        if (userAuth) {
          await validateToken(userAuth)
        }
      })
    }
  }, [offline])
}
