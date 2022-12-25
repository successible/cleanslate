import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

export const startSentry = () => {
  const dsn = process.env.NEXT_PUBLIC_REACT_SENTRY_DSN
  if (dsn) {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_REACT_SENTRY_DSN,
      ignoreErrors: [
        /Firebase: The popup has been closed by the user /,
        /INTERNAL ASSERTION FAILED: Pending promise was never set/,
        /Firebase: A network AuthError/,
        /Firebase: This operation has been cancelled due to another conflicting popup being opened/,
        /Something went wrong with validateToken/,
      ],
      integrations: [new BrowserTracing()],
      // We do not use Sentry's tracing functionality
      tracesSampleRate: 0,
    })
  }
}
