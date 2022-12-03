import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

export const startSentry = () => {
  const dsn = process.env.NEXT_PUBLIC_REACT_SENTRY_DSN
  if (dsn) {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_REACT_SENTRY_DSN,
      integrations: [new BrowserTracing()],
      // We do not use Sentry's tracing functionality
      tracesSampleRate: 0,
    })
  }
}
