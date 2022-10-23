import { css } from '@emotion/react'
import React from 'react'
import Sun from '../../assets/common/sun.svg'
import { round } from '../../helpers/utility/round'
import { Log } from '../../models/Log/model'
import { defaultTargets, Profile } from '../../models/Profile/model'
import { colors } from '../../theme'
import { Image } from '../image/Image'
import { calculateMacros } from '../macros/helpers/calculateMacros'
import { getSuccessLevel } from './helpers/getSuccessLevel'

type props = {
  profile: Profile
  logs: Log[]
}

const numbers = css`
  margin: 0 auto;
  margin-bottom: 20px;
  margin-top: 20px;
  width: 100%;
`

const number = css`
  flex: 1;
  margin-left: 10px;
  &:last-child {
    margin-left: 0;
  }
  > div {
    border-radius: 5px;
    font-size: 0.95rem;
    height: 32px;
    margin-left: 10px;
    width: 55px;

    div {
      color: ${colors.black};
    }
  }
`

const check = css`
  color: white !important;
  font-size: 1.3rem;
  position: relative;
  display: inline-block;
  margin-top: -1.5px;
`

export const Numbers: React.FC<props> = (props) => {
  const { logs, profile } = props

  const [caloriesConsumed, proteinConsumed, exerciseDone] = calculateMacros(
    logs
  ).map((v) => Math.round(v))

  let [calorieTarget, proteinTarget] = defaultTargets

  calorieTarget = profile.calorieTarget
  proteinTarget = profile.proteinTarget

  const calorieDifference = calorieTarget + exerciseDone - caloriesConsumed
  const proteinDifference = proteinTarget - proteinConsumed

  const loading = proteinTarget === defaultTargets[1]
  const hide = loading || profile.showCalories === false

  const calorieFree = <Image width={20} height={20} alt="Sun" src={Sun} />

  return (
    <div css={numbers}>
      <div className="fr">
        <div
          css={number}
          className={`frc ${getSuccessLevel(calorieDifference)}`}
        >
          Calories
          <div className={`green fcc`}>
            {hide ? calorieFree : <div>{round(calorieDifference, 0)}</div>}
          </div>
        </div>
        <div css={number} className={`frc`}>
          Protein
          <div className={`fcc ${proteinDifference <= 0 ? 'success' : 'blue'}`}>
            {hide ? (
              calorieFree
            ) : (
              <div>
                {proteinDifference <= 0 ? (
                  <div css={check}>✓</div>
                ) : (
                  <div>{round(proteinDifference, 0)}</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
