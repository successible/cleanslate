import { css } from '@emotion/react'
import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import { Navbar } from '../components/navbar/Navbar'
import { getContactEmail } from '../helpers/data/getContactEmail'

export const text = `

**Last updated: 10/30/2022**

Let's keep this short and sweet ❤️

- If you use Clean Slate, you agree to the Terms of Use and Privacy Policy.
- To use Clean Slate, you need to be 18 or older. 
- If we make a significant change to this policy, we will let you know via email.
- If you want to contact us about something, such as this Terms of Use or Privacy Policy, email ${getContactEmail()}.

## Terms of Use

- You cannot use Clean Slate in a way that infringes upon the rights of others, or in any way that is illegal, threatening, fraudulent, or harmful. 
- We reserve the right to refuse service and terminate accounts on this hosted service at our sole discretion.
- Clean Slate is intended for informational purposes only. That means a couple of things. One, we are not a substitute for a doctor. Two, some of our information, like the calorie count of a given food, may be wrong, despite our best effort to ensure accuracy. 
- Clean Slate may offer an API. You can use this API as long as it is for personal, non-commercial use and you do not violate any technical limitations. For example, rate limiting, excessive bandwidth consumption, etc. In short, be a good digital citizen.

## Privacy

- Clean Slate collects only the minimum data required to operate:

  - The data you explicitly provide. That data is stored on the server that serves Clean Slate. For example, app.cleanslate.sh is hosted on [Render.com](https://render.com/privacy). If this instance of Clean Slate is self-hosted, in may be in a different location. Email your host at ${getContactEmail()} for details.
  - The data needed to handle bugs. That data is stored in [Honeybadger.io](https://www.honeybadger.io/privacy/).
  - The data needed to securely authenticate you. That data is stored in [Firebase.com](https://firebase.google.com/support/privacy), which is owned by Google.

- Clean Slate will never sell your data to a third-party.
- Clean Slate will never share your data with a third-party, unless it is for a required service listed above or it is for a feature for which you have given your consent. For example, sharing your logs with a partner.
- Clean Slate may send you a newsletter or marketing email. You can unsubscribe from all of these emails with one click and never hear from us again.
- To support our costs, Clean Slate may adopt initiatives such as advertisements, sponsored posts, or affiliate marketing. All of these will be clearly marked as such and will not infringe on your privacy via targeting. In other words, every user of Clean Slate will see the exact same content.
- If you want to delete your data, delete your account through the Clean Slate interface. All your data will be deleted instantly!
- If you have any other questions about your data, or wish to download it, email ${getContactEmail()}.
`

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
        {/* eslint-disable-next-line react/no-children-prop */}
        <ReactMarkdown children={text} />
      </div>
    </div>
  )
}

export default Privacy
