import { css } from '@emotion/react'
import { getConfig } from '../../helpers/config'
import { oidcButtonLabel } from '../../helpers/getOidcConfig'
import { LegalDisclaimer } from './LegalDisclaimer'

export const OidcLoginButton = () => {
  return (
    <div
      css={css`
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <button
        type="button"
        id="oidc-login-button"
        className="black bold mt20"
        onClick={() => {
          window.location.href = `${getConfig().authenticationServerUri}/oidc/login`
        }}
      >
        {oidcButtonLabel}
      </button>
      <LegalDisclaimer />
    </div>
  )
}
