import { css } from '@emotion/react'
import React from 'react'
import Sun from '../../assets/common/sun.svg'
import { round } from '../../helpers/round'
import { Log } from '../../models/log'
import { defaultTargets, Profile } from '../../models/profile'
import { colors } from '../../theme'
import { Image } from '../image/Image'
import { calculateMacros } from '../macros/helpers/calculateMacros'

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

    div {
      color: ${colors.black};
      padding: 0px 7.5px;
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
  const countDown = profile.countDown

  const [caloriesConsumed, proteinConsumed, exerciseDone] = calculateMacros(
    logs
  ).map((v) => Math.round(v))

  let [calorieTarget, proteinTarget] = defaultTargets

  calorieTarget = profile.calorieTarget
  proteinTarget = profile.proteinTarget

  const calorieDifference = calorieTarget + exerciseDone - caloriesConsumed
  const proteinDifference = proteinTarget - proteinConsumed

  const loading = proteinTarget === defaultTargets[1]
  const hideCalories = loading || profile.showCalories === false

  const calorieFree = <Image width={20} height={20} alt="Sun" src={Sun} />

  return (
    <div css={numbers}>
      <div className="fr">
        <div css={number} className={`frc`}>
          Calories
          <div className={`green fcc`}>
            {hideCalories ? (
              calorieFree
            ) : (
              <div>
                {countDown ? (
                  round(calorieDifference, 0)
                ) : (
                  <>
                    {caloriesConsumed}
                    <span
                      css={css`
                        margin: 0px 2px;
                      `}
                    >
                      /
                    </span>
                    {calorieTarget}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div css={number} className={`frc`}>
          Protein
          <div
            className={`fcc ${
              proteinDifference <= 0 && countDown ? 'success' : 'blue'
            }`}
          >
            {hideCalories ? (
              calorieFree
            ) : (
              <div>
                {countDown && proteinDifference <= 0 && (
                  <div css={check}>✓</div>
                )}

                {countDown &&
                  proteinDifference > 0 &&
                  round(proteinDifference, 0)}

                {!countDown && (
                  <>
                    {proteinConsumed}
                    <span
                      css={css`
                        margin: 0px 2px;
                      `}
                    >
                      /
                    </span>
                    {proteinTarget}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
