import { isProduction } from '../ui/isProduction'

export const getDomain = () =>
  isProduction() ? process.env.NEXT_PUBLIC_ROOT_DOMAIN : 'localhost'
