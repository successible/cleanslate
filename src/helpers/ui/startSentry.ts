import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

export const startSentry = () => {
  const dsn = process.env.NEXT_PUBLIC_REACT_SENTRY_DSN
  if (dsn) {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_REACT_SENTRY_DSN,
      ignoreErrors: [
        /AbortError: The operation was aborted/,
        /Error: AbortError: The operation was aborted/,
        /Firebase: A network AuthError/,
        /Firebase: The popup has been closed by the user /,
        /Firebase: The user did not grant your application the permissions it requested/,
        /Firebase: This operation has been cancelled due to another conflicting popup being opened/,
        /Firebase: This operation is sensitive and requires recent authentication/,
        /Firebase: Unable to establish a connection with the popup/,
        /INTERNAL ASSERTION FAILED: Pending promise was never set/,
        /Something went wrong with validateToken/,
      ],
      integrations: [new BrowserTracing()],
      // We do not use Sentry's tracing functionality
      tracesSampleRate: 0,
    })
  }
}
