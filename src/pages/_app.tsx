import '../../node_modules/chagall/src/chagall.scss'
import 'firebase/compat/auth'
import { css } from '@emotion/react'
import { Honeybadger, HoneybadgerErrorBoundary } from '@honeybadger-io/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ReactNode } from 'react'
import { StoreContext } from 'storeon/react'
import { ErrorComponent } from '../components/error/ErrorBoundary'
import { startHoneybadger } from '../helpers/ui/startHoneybadger'
import { useErrors } from '../helpers/ui/useErrors'
import { store } from '../store/store'

function _App({ Component, pageProps }: AppProps) {
  // Enable Honeybadger if the API key is present
  startHoneybadger()
  // Listen to unhandled errors and Promise rejections
  useErrors()

  return (
    <HoneybadgerErrorBoundary
      honeybadger={Honeybadger}
      ErrorComponent={ErrorComponent as unknown as ReactNode}
    >
      <StoreContext.Provider value={store}>
        <Head>
          <title>Clean Slate | App</title>
          <meta name="description" content={'Track Food without Judgement'} />
        </Head>
        <div
          css={css`
            min-height: 100vh;
            > #app {
              height: 100vh;
            }
          `}
        >
          <Component {...pageProps} />
        </div>
      </StoreContext.Provider>
    </HoneybadgerErrorBoundary>
  )
}
export default _App
