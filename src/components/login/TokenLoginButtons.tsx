import { css } from '@emotion/react'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { GET_PROFILE } from '../../graphql/profile'
import { tokenKey } from '../../helpers/constants'
import { getDomain } from '../../helpers/getDomain'
import { getHasuraClient } from '../../helpers/getHasuraClient'
import { getJWT } from '../../helpers/getJWT'
import { getStore } from '../../helpers/getStore'
import { login } from '../../helpers/login'
import { Explanation } from '../explanation/Explanation'

export const TokenLoginButtons = () => {
  const [token, setToken] = useState('')

  return (
    <form
      css={css`
        width: 90%;
      `}
    >
      <label>Token</label>
      <input
        id="token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        className="mt10"
        type="password"
        placeholder="XXX"
        required
      />
      <button
        type="submit"
        id="login-button"
        className="black bold mt20"
        onClick={async (e) => {
          e.preventDefault()
          if (token) {
            const JWT = await getJWT(token)
            const client = await getHasuraClient(JWT)
            const response = await client.request(GET_PROFILE, {
              token,
            })
            if (response === undefined || response.profiles.length === 0) {
              toast.error('No profile matches that token!')
            } else {
              Cookies.set(tokenKey, token, {
                domain: getDomain(),
              })
              login()
              getStore().dispatch('updateUser', { token })
            }
          } else {
            toast.error('You must enter your token!')
          }
        }}
      >
        Login
      </button>
      <Explanation
        css={css`
          width: 100%;
          font-size: 0.95rem;
          margin-top: 30px;
          margin-bottom: 30px;
        `}
        color="yellow"
      >
        <div>
          To create an account, use the Hasura Console to create a profile. The
          value of authId is the token.
        </div>
      </Explanation>
    </form>
  )
}
