export const firebaseEnabled = process.env.NEXT_PUBLIC_USE_FIREBASE === 'true'

export const getFirebaseConfig = () => {
  const config = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG || '{}')
  return config
}
