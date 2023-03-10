import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

export const errorsToIgnore = [
  /AbortError: The operation was aborted/,
  /Could not verify JWT: JWTExpired/,
  /Error: AbortError: The operation was aborted/,
  /Firebase: A network AuthError/,
  /Firebase: The popup has been closed by the user /,
  /Firebase: The user did not grant your application the permissions it requested/,
  /Firebase: This operation has been cancelled due to another conflicting popup being opened/,
  /Firebase: This operation is sensitive and requires recent authentication/,
  /Firebase: Unable to establish a connection with the popup/,
  /Hydration failed because the initial UI does not match what was rendered on the server/,
  /INTERNAL ASSERTION FAILED: Pending promise was never set/,
  /Missing 'Authorization' or 'Cookie' header in JWT authentication mode/,
  /Network Error/,
  /NotAllowedError: play() can only be initiated by a user gesture/,
  /Request aborted/,
  /Error: validateToken/,
  /Text content does not match server-rendered HTML/,
  /the entire root will switch to client rendering/,
  /There was an error while hydrating/,
  /Uniqueness violation/,
]

export const startSentry = () => {
  const dsn = process.env.NEXT_PUBLIC_REACT_SENTRY_DSN
  if (dsn) {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_REACT_SENTRY_DSN,
      ignoreErrors: errorsToIgnore,
      integrations: [
        new BrowserTracing(),
        new Sentry.Replay({
          blockAllMedia: false,
          maskAllInputs: false,
          maskAllText: false,
        }),
      ],
      replaysOnErrorSampleRate: 1.0,
      tracesSampleRate: 0,
    })
  }
}
