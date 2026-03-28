import { useEffect } from 'react'
import { getConfig } from '../helpers/config'
import { getStore } from '../helpers/getStore'
import { login } from '../helpers/login'

export const useOidcCallback = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    if (code) {
      // Strip the code from the URL immediately
      window.history.replaceState({}, document.title, window.location.pathname)

      // Exchange the single-use code for a JWT via POST
      fetch(`${getConfig().authenticationServerUri}/oidc/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Code exchange failed')
          return res.json()
        })
        .then((data) => {
          if (data.jwt) {
            localStorage.setItem('JWT', data.jwt)
            login()
            getStore().dispatch('updateUser', { token: 'oidc' })
          }
        })
        .catch((err) => {
          console.log('OIDC code exchange error:', err)
        })
    }
  }, [])
}
