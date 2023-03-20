export const getFirebaseServiceAccount = () => {
  const config = JSON.parse(process.env.SERVICE_ACCOUNT || '{}')
  return config
}
