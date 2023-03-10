import { css } from '@emotion/react'
import React from 'react'
import { Profile } from '../../models/profile'
import { colors } from '../../theme'
import { DeleteAccount } from './DeleteAccount'
import { Information } from './Information'

export const documentation = css`
  margin: 20px auto;
  max-width: 800px;
  padding-bottom: 10px;
  width: 80%;
  line-height: 1.6;
  h2 {
    margin-bottom: 25px;
    margin-top: 25px;
  }
  h3 {
    margin-bottom: 25px;
    margin-top: 25px;
  }
  ul,
  ol {
    margin-bottom: 20px;
    margin-left: 20px;
  }
`

export const subheader = css`
  font-size: 1rem;
  font-weight: 400;
  width: 100%;
`

export const button = css`
  border: 1px solid ${colors.lightgrey};
  font-size: 1.1rem;
  img {
    height: 40px;
    margin-right: 10px;
    width: 40px;
  }
`

type props = { profile: Profile }
export const Settings: React.FC<props> = ({ profile }) => {
  return (
    <div css={documentation} className={`fcc`}>
      <h1>Settings ⚙️</h1>
      <Information profile={profile} />
      <DeleteAccount profile={profile} />
    </div>
  )
}
