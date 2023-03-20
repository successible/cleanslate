export const getFirebaseConfig = () => {
  const config = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG || '{}')
  return config
}
