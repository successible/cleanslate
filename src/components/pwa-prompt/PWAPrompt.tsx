import { css } from '@emotion/react'
import ChromeShare from '../../assets/common/chrome-share.svg'
import SafariShare from '../../assets/common/safari-share.svg'
import Logo from '../../assets/logo-circle.svg'
import { getDispatch } from '../../helpers/getDispatch'
import { isMobileSafari } from '../../helpers/isMobileSafari'
import { updateProfileOnCloud } from '../../helpers/profile/updateProfileOnCloud'
import type { Profile } from '../../models/profile'
import { Image } from '../image/Image'

type props = { profile: Profile }
export const PWAPrompt: React.FC<props> = ({ profile }) => {
  const dispatch = getDispatch()

  return (
    <div className="fcc">
      <Image width={100} height={100} src={Logo} alt="Logo" />
      <h2
        css={css`
          color: #111;
          font-size: 1.6rem;
          font-weight: 900;
        `}
        className="mt20"
      >
        Clean Slate
      </h2>
      <p
        css={css`
          font-size: 1.1rem;
          max-width: 400px;
          text-align: center;
        `}
      >
        Add this app to your homescreen for easy access and an app-like
        experience.
      </p>
      <div
        css={css`
          font-size: 1.1rem;
          width: 100%;
        `}
        className="frc mt10 mb20"
      >
        Tap{' '}
        {isMobileSafari() ? (
          <div className="ml10 mr10">
            <Image
              width={25}
              height={25}
              src={SafariShare}
              alt="Safari share button"
            />
          </div>
        ) : (
          <div className="ml10 mr10">
            <Image
              width={25}
              height={25}
              src={ChromeShare}
              alt="Chrome share button"
            />
          </div>
        )}{' '}
        then {`"`}Add to Homescreen{`"`}
      </div>
      <div>
        <button
          type="button"
          className="purple bold mt10"
          onClick={() => {
            const variables = {
              id: profile.id,
              set: {
                hidePWAPrompt: true,
              },
            }
            updateProfileOnCloud(variables, () => {
              dispatch('closePWAPrompt')
            })
          }}
        >
          Hide this tip in the future
        </button>
      </div>
    </div>
  )
}
