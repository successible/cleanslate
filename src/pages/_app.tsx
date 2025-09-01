import '../theme.scss'
import 'react-toastify/dist/ReactToastify.css'
import 'firebase/compat/auth'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import * as Sentry from '@sentry/react'
import { setAutoFreeze } from 'immer'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import { ErrorComponent } from '../components/error/ErrorBoundary'
import { createWebsocketClient } from '../helpers/createWebsocketClient'
import { handleError } from '../helpers/handleError'
import { startSentry } from '../helpers/startSentry'
import { useErrors } from '../hooks/useErrors'
import { store } from '../store/store'
import { StoreContext } from '../storeon'

// https://github.com/immerjs/immer/issues/959
setAutoFreeze(false)
startSentry()

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createWebsocketClient(),
})

function _App({ Component, pageProps }: AppProps) {
  // Listen to unhandled errors and Promise rejections
  useErrors()

  return (
    <Sentry.ErrorBoundary
      onError={(e) => {
        // Sentry is already capturing the error here, we do not want to report it again
        handleError(e, { hideFromSentry: true })
      }}
      fallback={<ErrorComponent />}
      beforeCapture={(scope) => {
        try {
          scope.setUser({ id: store.get().data.profiles[0].authId })
        } catch (_e) {
          console.log('Storeon is not configured yet. Skipping.')
        }
        scope.setExtra('version', process.env.NEXT_PUBLIC_VERSION || 'Unknown')
      }}
    >
      <ApolloProvider client={client}>
        <StoreContext.Provider value={store}>
          <Head>
            <title>Clean Slate | App</title>
            <meta name="description" content={'Track food without judgement'} />
          </Head>
          <div className="body">
            <Component {...pageProps} />
          </div>
        </StoreContext.Provider>
      </ApolloProvider>
      <ToastContainer closeOnClick />
    </Sentry.ErrorBoundary>
  )
}
export default _App
