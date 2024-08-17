import { css } from '@emotion/react'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { getConfig } from '../../helpers/config'
import { tokenKey } from '../../helpers/constants'
import { getStore } from '../../helpers/getStore'
import { login } from '../../helpers/login'
import { Explanation } from '../explanation/Explanation'
import { LegalDisclaimer } from './LegalDisclaimer'

export const TokenLoginButtons = () => {
  const [token, setToken] = useState('')
  const noMatch = 'No matching profile found! Make sure to login with apiToken, not authId.'

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
            try {
              const response = await axios.post(
                getConfig().authenticationServerUri + '/login',
                { token }
              )
              if (response.data) {
                localStorage.setItem('JWT', response.data)
                localStorage.setItem(tokenKey, token)
                login()
                getStore().dispatch('updateUser', { token })
              } else {
                toast.error(noMatch)
              }
            } catch {
              toast.error(noMatch)
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
          margin-bottom: 20px;
        `}
        color="yellow"
      >
        <div>
          To create an account, the admin must use the Hasura Console to make a
          profile. The token is the apiToken of the profile. To learn more about
          the app,{' '}
          <a href="https://cleanslate.sh/" target="_blank" rel="noreferrer">
            go here.
          </a>
        </div>
      </Explanation>
      <LegalDisclaimer />
    </form>
  )
}
