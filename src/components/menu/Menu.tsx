import { css } from '@emotion/react'
import React from 'react'
import { useStoreon } from 'storeon/react'
import CustomFood from '../../assets/common/food.svg'
import Logout from '../../assets/common/logout.svg'
import Mortarboard from '../../assets/common/mortarboard.svg'

import CustomRecipe from '../../assets/common/recipe.svg'
import Feedback from '../../assets/common/review.svg'
import Settings from '../../assets/common/settings.svg'
import { getContactEmail } from '../../helpers/getContactEmail'
import { logout } from '../../helpers/logout'
import { NavbarEvents, NavbarState } from '../../store/navbar/types'
import { Dispatch } from '../../store/types'
import { Explanation } from '../explanation/Explanation'
import { Image } from '../image/Image'

export const Menu: React.FC = () => {
  const {
    dispatch,
    navbar,
  }: {
    dispatch: Dispatch<keyof NavbarEvents>
    navbar: NavbarState
  } = useStoreon('navbar')

  const buttonToFocus = React.useRef<HTMLButtonElement>(null)

  // Focus on the first button of the sidebar when spawned
  React.useEffect(() => {
    if (
      buttonToFocus.current &&
      navbar.menuVisibility === true &&
      window.innerWidth > 1024
    ) {
      buttonToFocus.current?.focus()
    }
  }, [navbar.menuVisibility])

  const sidebar = css`
    margin: 10px auto;
    width: 90%;
  `

  const section = css`
    margin-top: 15px;
    > div {
      margin: 15px 0;
      &:first-of-type {
        margin-top: 5px;
      }
    }
    > button,
    > a.button {
      font-size: 0.95rem;
      justify-content: flex-start;
      width: 100%;

      img {
        margin-left: 5px;
        margin-right: 15px;
      }
    }
  `

  return (
    <div id="Sidebar" css={sidebar} className={`fcs`}>
      <div css={section} className={`w100`}>
        <div>Create</div>

        <button
          ref={buttonToFocus}
          onClick={() => {
            dispatch('openFoodModal')
          }}
        >
          <Image
            width={35}
            height={35}
            alt="Apple with pencil"
            className="icon"
            src={CustomFood}
          />
          <div className="ml15">Custom foods</div>
        </button>

        <button
          onClick={() => {
            dispatch('openRecipeModal')
          }}
        >
          <Image
            alt="Eggs and bacon with pencil"
            className="icon"
            width={35}
            height={35}
            src={CustomRecipe}
          />
          <div className="ml15">Recipes</div>
        </button>
      </div>

      <div css={section} className={`w100`}>
        <div>Learn</div>
        <button
          onClick={() => {
            window.open('https://cleanslate.sh/curriculum')
          }}
        >
          <Image
            width={35}
            height={35}
            alt="Graduation cap"
            className="icon"
            src={Mortarboard}
          />
          <div className="ml15">Curriculum</div>
        </button>
      </div>

      <div css={section} className={`w100`}>
        <div>Other</div>

        <button
          onClick={() => {
            dispatch('openSettingsModal')
          }}
        >
          <Image
            width={35}
            height={35}
            alt="Cog"
            className="icon"
            src={Settings}
          />
          <div className="ml15">Settings</div>
        </button>

        <button
          onClick={() => {
            dispatch(
              'openInformationModal',
              <div>
                Got something to share? Perhaps some feedback or a bug? Awesome!
                We collect and track our feedback on the free website
                GitHub.com. That way, all feedback is transparent to everyone
                and we{`'`}re notified when new stuff is posted.
                <br />
                <br />
                To get started,{' '}
                <a
                  target="_blank"
                  href="https://github.com/successible/cleanslate/issues/new/choose"
                  rel="noreferrer"
                >
                  navigate to GitHub
                </a>{' '}
                and create a free account. It should only take a minute. Then,
                post on the Discussions page!
                <Explanation color="blue">
                  <div>
                    Don{`'`}t feel comfortable sharing your feedback publicly?
                    No worries! You can also email us at{' '}
                    <a href={`mailto:${getContactEmail()}`}>
                      {getContactEmail()}
                    </a>
                    .
                  </div>
                </Explanation>
              </div>
            )
          }}
        >
          <Image
            width={35}
            height={35}
            alt="Letter"
            className="icon"
            src={Feedback}
          />
          <div className="ml15">Feedback</div>
        </button>

        <button
          onClick={() => {
            logout()
          }}
        >
          <Image
            width={35}
            height={35}
            alt="Door openings"
            className="icon"
            src={Logout}
          />
          <div className="ml15">Logout</div>
        </button>
      </div>
    </div>
  )
}
