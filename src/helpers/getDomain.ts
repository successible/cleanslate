import { isProduction } from './isProduction'

export const getDomain = () =>
  isProduction()
    ? '.' + window.location.hostname.split('.').slice(-2).join('.') // The root domain
    : 'localhost'
