import * as Sentry from '@sentry/react'

export const dsn = process.env.NEXT_PUBLIC_REACT_SENTRY_DSN

export const errorsToIgnore = [
  /AbortError/,
  /Connection to Indexed Database server lost/,
  /Could not verify JWT: JWTExpired/,
  /Error: AbortError: The operation was aborted/,
  /Error: validateToken/,
  /Firebase: A network AuthError/,
  /Firebase: An account already exists with the same email address but different sign-in credentials/,
  /Firebase: The popup has been closed by the user /,
  /Firebase: The user did not grant your application the permissions it requested/,
  /Firebase: This operation has been cancelled due to another conflicting popup being opened/,
  /Firebase: This operation is sensitive and requires recent authentication/,
  /Firebase: Unable to establish a connection with the popup/,
  /Hydration failed because the initial UI does not match what was rendered on the server/,
  /INTERNAL ASSERTION FAILED: Pending promise was never set/,
  /Load failed/,
  /Missing 'Authorization' or 'Cookie' header in JWT authentication mode/,
  /Network Error/,
  /NetworkError when attempting to fetch resource/,
  /Non-Error exception captured with keys/,
  /NotAllowedError: play() can only be initiated by a user gesture/,
  /Request aborted/,
  /Text content does not match server-rendered HTML/,
  /the entire root will switch to client rendering/,
  /There was an error while hydrating/,
  /Uniqueness violation/,
  /UnknownError: Error looking up record in object store by key range/,
]

export const startSentry = () => {
  if (dsn) {
    Sentry.init({
      dsn,
      ignoreErrors: errorsToIgnore,
      integrations: [
        new Sentry.BrowserTracing(),
        new Sentry.Replay({
          blockAllMedia: false,
          maskAllInputs: false,
          maskAllText: false,
          networkDetailAllowUrls: [window.location.origin],
        }),
      ],
      replaysOnErrorSampleRate: 1.0,
      tracesSampleRate: 0,
    })
  }
}
