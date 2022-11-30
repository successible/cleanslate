import 'firebase/compat/auth'
import { css } from '@emotion/react'
import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import Link from 'next/link'
import { FaApple, FaGoogle } from 'react-icons/fa'
import { firebaseApp } from '../../pages'
import { Explanation } from '../explanation/Explanation'

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

export const LoginButtons = () => {
  return (
    <div className="fcc w100">
      {/* Social login buttons */}
      <div className="fcc w100">
        <div className="frc wrap">
          <button
            className="black m5 ml5 mr5"
            css={css`
              background-color: #4285f4;
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
            <FaGoogle className="mr10" size={15} />
            Sign in with Google
          </button>
          <button
            className="black m5 ml5 mr5"
            onClick={() => {
              const auth = getAuth(firebaseApp)
              signInWithPopup(auth, new OAuthProvider('apple.com')).then(() => {
                window.location.href = '/app'
              })
            }}
          >
            <FaApple className="mr10" size={15} />
            Sign in with Apple
          </button>
        </div>
      </div>

      <Explanation
        css={css`
          width: 90%;
          font-size: 0.95rem;
          margin-top: 30px;
          margin-bottom: 10px;
        `}
        color="yellow"
      >
        When you login, an account will be created automatically. Clean Slate is
        also totally free. So enjoy!
      </Explanation>
      <p
        css={css`
          font-size: 0.7rem;
          margin-top: 20px;
          text-align: center;
          padding-bottom: 10px;
        `}
      >
        By signing in, you agree to our <Link href="/legal">Terms</Link> &#38;{' '}
        <Link href="/legal">Privacy Policy</Link>
      </p>
    </div>
  )
}
