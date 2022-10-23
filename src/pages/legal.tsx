import { css } from '@emotion/react'
import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import { Navbar } from '../components/navbar/Navbar'
import { getContactEmail } from '../helpers/data/getContactEmail'

export const text = `

**Last updated: 10/22/2022**

Let's keep this short and sweet ❤️

- If you use Clean Slate, you agree to the Terms of Use and Privacy Policy
- To use Clean Slate, you need to be 18 or older. 
- If we make a significant change to this policy, we will let you know via email.
- If you want to contact us about something, such as the Terms of Use or Privacy Policy, email ${getContactEmail()}.

## Terms of Use

- You cannot use Clean Slate in a way that infringes upon the rights of others, or in any way that is illegal, threatening, fraudulent, or harmful. 
- We reserve the right to refuse service, terminate accounts, remove content, or cancel orders in our sole discretion.
- Clean Slate is intended for informational purposes only. That means a couple of things. One, we are not a substitute for a doctor. Two, some of our information, like the calorie count of a given food, may be wrong, despite our best effort to ensure accuracy. 

## Privacy

- Clean Slate collects only the minimum data required to operate:

  - The data you explicitly provide. That data is stored on the server that serves Clean Slate. For example, app.cleanslate.sh is hosted on [Render.com](https://render.com/privacy). If this instance of Clean Slate is self-hosted, in may be in a different location. Email your host at ${getContactEmail()} for details.
  - The data needed to handle bugs. That data is stored in [Honeybadger](https://www.honeybadger.io/privacy/).
  - The data needed to securely authenticate you. That data is stored in [Firebase](https://firebase.google.com/support/privacy) by Google.

- If you have any questions about your data, or wish to download it, email ${getContactEmail()}.
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
