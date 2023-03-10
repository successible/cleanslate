import { User } from './getUser'

// To debug a bug in Clean Slate, you can log in as another user if you know their Firebase uid
// And you have a service account for your Firebase instance

export const getCustomAuth = () => ({
  domain: process.env.NEXT_PUBLIC_PRODUCTION_API_DOMAIN,
  token: process.env.NEXT_PUBLIC_CUSTOM_TOKEN,
  uid: process.env.NEXT_PUBLIC_UID,
  user: JSON.parse(
    String(process.env.NEXT_PUBLIC_USER || '{}')
  ) as unknown as User,
})

export const isCustomUser = () => Boolean(getCustomAuth().token)
