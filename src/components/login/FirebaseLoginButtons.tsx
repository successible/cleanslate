import 'firebase/compat/auth'
import { css } from '@emotion/react'
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  OAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { FaApple, FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa'
import { firebaseApp } from '../../pages'
import { Explanation } from '../explanation/Explanation'
import { LegalDisclaimer } from './LegalDisclaimer'

export const loginButton = css`
  border-radius: 5px;
  color: white;
  font-size: 0.95rem;
  font-weight: 700;
  margin: 5px 5px;
  min-width: 225px;
  padding: 15px 0;
  text-decoration: none;

  > span {
    margin-right: 15px;
  }
`

export const FirebaseLoginButtons = () => {
  return (
    <div className="fcc w100">
      {/* Social login buttons */}
      <div className="fcc w100">
        <div className="frc wrap">
          {process.env.NEXT_PUBLIC_LOGIN_WITH_GOOGLE === 'true' && (
            <button
              type="button"
              className="black m5 ml5 mr5"
              css={css`
                background-color: #4285f4;
                width: 210px;
                &:hover,
                &:focus {
                  background-color: #2472f2;
                }
              `}
              onClick={() => {
                const auth = getAuth(firebaseApp)
                signInWithPopup(auth, new GoogleAuthProvider()).then(() => {
                  setTimeout(() => {
                    window.location.reload()
                  }, 100)
                })
              }}
            >
              <FaGoogle className="mr10" size={18} />
              Sign in with Google
            </button>
          )}
          {process.env.NEXT_PUBLIC_LOGIN_WITH_APPLE === 'true' && (
            <button
              type="button"
              css={css`
                width: 210px;
              `}
              className="black m5 ml5 mr5"
              onClick={() => {
                const auth = getAuth(firebaseApp)
                signInWithPopup(auth, new OAuthProvider('apple.com')).then(
                  () => {
                    setTimeout(() => {
                      window.location.reload()
                    }, 100)
                  }
                )
              }}
            >
              <FaApple className="mr10" size={18} />
              Sign in with Apple
            </button>
          )}
          {process.env.NEXT_PUBLIC_LOGIN_WITH_FACEBOOK === 'true' && (
            <button
              type="button"
              css={css`
                width: 210px;
              `}
              className="facebook m5 ml5 mr5"
              onClick={() => {
                const auth = getAuth(firebaseApp)
                signInWithPopup(auth, new FacebookAuthProvider()).then(() => {
                  setTimeout(() => {
                    window.location.reload()
                  }, 100)
                })
              }}
            >
              <FaFacebook className="mr10" size={18} />
              Sign in with Facebook
            </button>
          )}
          {process.env.NEXT_PUBLIC_LOGIN_WITH_GITHUB === 'true' && (
            <button
              type="button"
              css={css`
                width: 210px;
              `}
              className="black m5 ml5 mr5"
              onClick={() => {
                const auth = getAuth(firebaseApp)
                signInWithPopup(auth, new GithubAuthProvider()).then(() => {
                  setTimeout(() => {
                    window.location.reload()
                  }, 100)
                })
              }}
            >
              <FaGithub className="mr10" size={18} />
              Sign in with GitHub
            </button>
          )}
        </div>
      </div>

      <Explanation
        css={css`
          width: 90%;
          font-size: 0.95rem;
          margin-top: 30px;
          margin-bottom: 20px;
        `}
        color="yellow"
      >
        <div>
          An account is made automatically on login. Clean Slate is free, so
          enjoy! To learn more about the app,{' '}
          <a href="https://cleanslate.sh/" target="_blank" rel="noreferrer">
            go here.
          </a>
        </div>
      </Explanation>
      <LegalDisclaimer />
    </div>
  )
}
