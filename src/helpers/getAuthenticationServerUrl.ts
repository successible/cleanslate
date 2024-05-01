import { isProduction } from './isProduction'

export const getAuthenticationUrl = (): string => {
  const domain = process.env.NEXT_PUBLIC_HASURA_DOMAIN
  if (isProduction()) {
    return `https://${domain}/auth`
  }
  return 'https://localhost/auth'
}
