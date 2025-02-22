import { css } from '@emotion/react'
import { profileIsLoaded } from '../../helpers/profileIsLoaded'
import type { Profile } from '../../models/profile'
import { colors } from '../../theme'
import { Spinner } from '../spinner/Spinner'

type props = {
  navbar: number
  footer: number
  children: React.ReactNode
  profile: Profile
}
export const Body: React.FC<props> = ({
  children,
  footer,
  navbar,
  profile,
}) => {
  const dataReady = profileIsLoaded(profile)
  const body = css`
    height: calc(100% - ${navbar + footer}px);
  `

  return (
    <div css={body} className={'scroll'}>
      {!dataReady && (
        <div className="h100 w100 fcc">
          <Spinner color={colors.purple} />
        </div>
      )}
      {dataReady && children}
    </div>
  )
}
