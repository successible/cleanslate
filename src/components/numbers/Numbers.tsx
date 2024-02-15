import { css } from '@emotion/react'
import React from 'react'
import { round } from '../../helpers/round'
import { ExerciseLog } from '../../models/exerciseLog'
import { Log } from '../../models/log'
import { defaultTargets, Profile } from '../../models/profile'
import { QuickLog } from '../../models/quickLog'
import { colors } from '../../theme'
import { calculateMacros } from '../macros/helpers/calculateMacros'

type props = {
  profile: Profile
  logs: Log[]
  quick_logs: QuickLog[]
  exercise_logs: ExerciseLog[]
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
    min-width: 40px;

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
  const { exercise_logs, logs, profile, quick_logs } = props
  const countDown = profile.countDown

  const [
    caloriesConsumedFromLogs,
    caloriesConsumedFromQuickLogs,
    caloriesBurnedFromExercise,
    proteinConsumed,
  ] = calculateMacros(logs, quick_logs, exercise_logs).map(Math.round)

  const caloriesConsumed =
    caloriesConsumedFromLogs +
    caloriesConsumedFromQuickLogs -
    caloriesBurnedFromExercise

  let [calorieTarget, proteinTarget] = defaultTargets

  calorieTarget = profile.calorieTarget
  proteinTarget = profile.proteinTarget

  const calorieDifference = calorieTarget - caloriesConsumed
  const proteinDifference = proteinTarget - proteinConsumed

  const loading = proteinTarget === defaultTargets[1]
  const hideCalories = loading || profile.showCalories === false

  const calorieFree = ''

  return (
    <div id="numbers" css={numbers}>
      <div className="fr">
        <div id="TopBarCalories" css={number} className={`frc`}>
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
                    {caloriesConsumedFromLogs + caloriesConsumedFromQuickLogs}
                    <span
                      css={css`
                        margin: 0px 2px;
                      `}
                    >
                      /
                    </span>
                    {calorieTarget + caloriesBurnedFromExercise}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div id="TopBarProtein" css={number} className={`frc`}>
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
