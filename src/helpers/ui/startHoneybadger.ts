import Honeybadger from '@honeybadger-io/js'
import { isProduction } from './isProduction'

export const startHoneybadger = () => {
  if (isProduction() && process.env.HONEYBADGER_API_KEY) {
    Honeybadger.configure({
      apiKey: process.env.HONEYBADGER_API_KEY,
      debug: true,
      enableUncaught: false,
      enableUnhandledRejection: false,
      environment: 'production',
    })
  }
}
