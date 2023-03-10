import 'firebase/compat/auth'
import firebase from 'firebase/compat/app'
import { useEffect, useState } from 'react'
import { App } from '../components/app/App'
import { Login } from '../components/login/Login'
import { getLoginStatus } from '../helpers/getLoginStatus'
import { isLoadedUser } from '../helpers/isLoadedUser'
import { useFirebase } from '../hooks/useFirebase'
import { useOffline } from '../hooks/useOffline'
import { useOfflineStatus } from '../hooks/useOfflineStatus'
import { useUser } from '../hooks/useUser'

const firebaseConfig = process.env.FIREBASE_CONFIG as unknown as object

// Only create Firebase if it has yet to be initialized
export const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

const Index = () => {
  const user = useUser()
  const offline = useOfflineStatus()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useOffline()
  useFirebase(offline)

  return (
    <>
      {mounted ? (
        isLoadedUser(user) || getLoginStatus() ? (
          <App />
        ) : (
          <Login />
        )
      ) : (
        <div />
      )}
    </>
  )
}

export default Index
