import { css } from '@emotion/react'
import Head from 'next/head'
import { Navbar } from '../components/navbar/Navbar'
import { getContactEmail } from '../helpers/getContactEmail'
import { firebaseEnabled } from '../helpers/getFirebaseConfig'

const Privacy = () => {
  return (
    <div id="legal">
      <Head>
        <title>Clean Slate | Legal</title>
      </Head>
      <Navbar />
      <h1 className="jumbo mt120 mb30">Legal</h1>
      <div
        className="center module"
        css={css`
          width: 90%;
          max-width: 800px;
          padding-bottom: 100px;
          h2 {
            font-size: 2.2rem;
            text-align: center;
            margin: 30px 0px;
            font-weight: 900;
          }
          ul {
            margin-left: 20px;
          }
        `}
      >
        <p>
          <strong>Last updated: 10/30/2022</strong>
        </p>
        <p>Let&#39;s keep this short and sweet ❤️</p>
        <ul>
          <li>
            If you use Clean Slate, you agree to the Terms of Use and Privacy
            Policy.
          </li>
          <li>To use Clean Slate, you need to be 18 or older. </li>
          <li>
            If we make a significant change to this policy, we will let you know
            via email.
          </li>
          <li>
            If you want to contact us about something, such as this Terms of Use
            or Privacy Policy, email{' '}
            <a href={`mailto:${getContactEmail()}`}>{getContactEmail()}</a>.
          </li>
        </ul>
        <h2 id="terms-of-use">Terms of Use</h2>
        <ul>
          <li>
            You cannot use Clean Slate in a way that infringes upon the rights
            of others, or in any way that is illegal, threatening, fraudulent,
            or harmful.{' '}
          </li>
          <li>
            We reserve the right to refuse service and terminate accounts on
            this hosted service at our sole discretion.
          </li>
          <li>
            Clean Slate is intended for informational purposes only. That means
            a couple of things. One, we are not a substitute for a doctor. Two,
            some of our information, like the calorie count of a given food, may
            be wrong, despite our best effort to ensure accuracy.{' '}
          </li>
          <li>
            Clean Slate may offer an API. You can use this API as long as it is
            for personal, non-commercial use and you do not violate any
            technical limitations. For example, rate limiting, excessive
            bandwidth consumption, etc. In short, be a good digital citizen.
          </li>
        </ul>
        <h2 id="privacy">Privacy</h2>
        <ul>
          <li>
            <p>
              Clean Slate collects only the minimum data required to operate:
            </p>
            <ul>
              <li>
                The data you explicitly provide. That data is stored in the
                database provided by Clean Slate. For example,{' '}
                <a href="app.cleanslate.sh">app.cleanslate.sh</a> is hosted on{' '}
                <a href="https://render.com/privacy">Render.com</a>. If this
                instance of Clean Slate is self-hosted, in may be in a different
                location. Email your host at{' '}
                {
                  <a href={`mailto:${getContactEmail()}`}>
                    {getContactEmail()}
                  </a>
                }{' '}
                for details.
              </li>
              <li>
                The data needed to handle bugs and performance. That data is
                stored in <a href="https://sentry.io/privacy/">Sentry.io</a>.
              </li>
              <li>
                The data needed to securely authenticate you. That data is
                stored in{' '}
                {firebaseEnabled ? (
                  <>
                    <a href="https://firebase.google.com/support/privacy">
                      Firebase.com
                    </a>
                    , which is owned by Google.
                  </>
                ) : (
                  <>this server.</>
                )}
              </li>
            </ul>
          </li>
          <li>
            <p>Clean Slate will never sell your data to a third-party.</p>
          </li>
          <li>
            Clean Slate will never share your data with a third-party, unless it
            is for a required service listed above or it is for a feature for
            which you have given your consent. For example, sharing your logs
            with a partner.
          </li>
          <li>
            Clean Slate may send you a newsletter or marketing email. You can
            unsubscribe from all of these emails with one click and never hear
            from us again.
          </li>
          <li>
            To support our costs, Clean Slate may adopt initiatives such as
            advertisements, sponsored posts, or affiliate marketing. All of
            these will be clearly marked as such and will not infringe on your
            privacy via targeting. In other words, every user of Clean Slate
            will see the exact same content.
          </li>
          <li>
            If you want to delete your data, delete your account through the
            Clean Slate interface. All your data will be deleted instantly!
          </li>
          <li>
            If you have any other questions about your data, or wish to download
            it, email{' '}
            {<a href={`mailto:${getContactEmail()}`}>{getContactEmail()}</a>}.
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Privacy
