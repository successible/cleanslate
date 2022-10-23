import 'firebase/compat/auth'
import firebase from 'firebase/compat/app'
import { useEffect, useState } from 'react'
import { App as Cleanslate } from '../components/app/App'
import { Login } from '../components/login/Login'
import { getLoginStatus } from '../helpers/authentication/getLoginStatus'
import { isLoadedUser } from '../helpers/authentication/isLoadedUser'
import { subscribeToUser } from '../helpers/authentication/subscribeToUser'
import { useFirebase } from '../helpers/authentication/useFirebase'
import { getOfflineStatus } from '../helpers/data/getOfflineStatus'
import { handleOffline } from '../helpers/data/handleOffline'

const firebaseConfig = process.env.FIREBASE_CONFIG as unknown as object

// Only create Firebase if it has yet to be initialized
export const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

const App = () => {
  const user = subscribeToUser()
  const offline = getOfflineStatus()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  handleOffline()
  useFirebase(offline)

  const app = mounted ? (
    isLoadedUser(user) || getLoginStatus() ? (
      <Cleanslate />
    ) : (
      <Login />
    )
  ) : (
    <div />
  )

  return app
}

export default App
