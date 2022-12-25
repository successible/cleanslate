import '../../node_modules/chagall/src/chagall.scss'
import 'firebase/compat/auth'
import * as Sentry from '@sentry/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Div100vh from 'react-div-100vh'
import { StoreContext } from 'storeon/react'
import { ErrorComponent } from '../components/error/ErrorBoundary'
import { startSentry } from '../helpers/ui/startSentry'
import { useErrors } from '../helpers/ui/useErrors'
import { store } from '../store/store'

function _App({ Component, pageProps }: AppProps) {
  // Enable Sentry if the API key is present
  startSentry()
  // Listen to unhandled errors and Promise rejections
  useErrors()

  return (
    <Sentry.ErrorBoundary fallback={<ErrorComponent />}>
      <StoreContext.Provider value={store}>
        <Head>
          <title>Clean Slate | App</title>
          <meta name="description" content={'Track food without judgement'} />
        </Head>
        <Div100vh>
          <Component {...pageProps} />
        </Div100vh>
      </StoreContext.Provider>
    </Sentry.ErrorBoundary>
  )
}
export default _App
