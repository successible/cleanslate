import { css } from '@emotion/react'
import { useStoreon } from 'storeon/react'
import ErrorImage from '../../assets/common/error.svg'
import { clearCache } from '../../helpers/clearCache'
import { clearLoginState } from '../../helpers/clearLoginState'
import { getDomain } from '../../helpers/getDomain'
import { isBrowser } from '../../helpers/isBrowser'
import { logout } from '../../helpers/logout'
import { mapError } from '../../helpers/mapError'
import { NavbarState } from '../../store/navbar/types'
import { colors } from '../../theme'
import { Explanation } from '../explanation/Explanation'
import { Image } from '../image/Image'

export const Error = () => {
  const {
    navbar,
  }: {
    navbar: NavbarState
  } = useStoreon('navbar')

  const domain = getDomain()
  const { error } = navbar

  const errorStyling = css`
    .jumbo {
      background-color: white;
      border: 1px solid ${colors.mediumgrey};
      border-radius: 5px;
      max-width: 500px;
      padding: 30px 0;
      width: 95%;
    }
  `

  return (
    <div css={errorStyling} className={`fcc w100 h100 z3 absolute`}>
      <div className="jumbo fcc">
        {/* The images */}
        <Image width={50} height={50} alt="Error" src={ErrorImage} />

        <div className="fcc w100">
          {/* The title */}
          <h2 className="mt20 mb15">{mapError(error)}</h2>

          {/* The subtitle */}
          <div className="mb30 w100">
            <div>
              <h3 className="mb10 normal center tcenter w95">
                The developers have been notified.
              </h3>
              <h3 className="mb0 normal center tcenter w95">
                Click the refresh button. It may fix it.
              </h3>
            </div>
          </div>

          {/* The button groups */}

          {/* Generic error buttons */}
          <div className="fr">
            <button
              onClick={() => {
                if (isBrowser()) {
                  clearCache()
                  clearLoginState()
                  window.location.reload()
                }
              }}
              className={` purple normal`}
            >
              Refresh the app
            </button>
            <button
              onClick={() => {
                if (isBrowser()) {
                  logout()
                }
              }}
              className={`background normal ml10`}
            >
              Logout
            </button>
          </div>

          {/* Additional error message */}
          <div>
            <div className="mt30">
              <Explanation color="blue">
                <div className="tcenter no-wrap">
                  <strong>Still stuck?</strong> Email{' '}
                  <a href={`mailto:contact@${domain}`}>contact@{domain}</a>
                </div>
              </Explanation>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
