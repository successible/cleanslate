import { isProduction } from '../ui/isProduction'

export const getDomain = () =>
  isProduction() ? process.env.ROOT_DOMAIN : 'localhost'
