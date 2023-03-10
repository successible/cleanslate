import Head from 'next/head'
import { Navbar } from '../components/navbar/Navbar'

const ErrorPage = () => {
  return (
    <>
      <Head>
        <title>Clean Slate | Error</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Navbar />
      <div className="mt100 ml20">
        <button
          type="button"
          className="button purple bold"
          onClick={() => {
            throw new Error('This is a test of Sentry')
          }}
        >
          Test Sentry
        </button>
      </div>
    </>
  )
}

export default ErrorPage
