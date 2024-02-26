import { css } from '@emotion/react'
import React from 'react'
import { addExerciseLogToCloud } from '../../../helpers/exercise-log/addExerciseLogToCloud'
import { updateExerciseLogOnCloud } from '../../../helpers/exercise-log/updateExerciseLogOnCloud'
import { prep } from '../../../helpers/prepareFractionalInputForSubmission'
import { round } from '../../../helpers/round'
import { ExerciseLog } from '../../../models/exerciseLog'
import { Profile } from '../../../models/profile'
import { store } from '../../../store/store'
import { md } from '../../../theme'
import { CommonItem } from '../../item/types'
import {
  LiftingActivity,
  liftingMET,
  OtherActivity,
  otherMet,
  SwimmingActivity,
  swimmingMET,
} from './constants'
import { calculateCaloriesFromMETs } from './helpers/calculateCaloriesFromMETs'
import { getMETsFromInput } from './helpers/getMETsFromInput'

export const group = [
  'Cycling',
  'Lifting',
  'Rowing',
  'Running',
  'Swimming',
  'Walking',
  'Other',
  'Custom',
] as const
export type ExerciseGroup = (typeof group)[number]

type props = { profile: Profile; item: CommonItem | undefined }
export const ExerciseForm: React.FC<props> = ({ item, profile }) => {
  const { metricSystem } = profile
  const exerciseLog = item?.data as ExerciseLog | undefined
  const [name, setName] = React.useState(exerciseLog?.name || '')
  const [weight, updateWeight] = React.useState(exerciseLog?.weight || '')
  const [minutes, setMinutes] = React.useState(exerciseLog?.duration || '')
  const [watt, setWatts] = React.useState(exerciseLog?.power || '')
  const [mph, setMph] = React.useState(exerciseLog?.pace || '')
  const [incline, setIncline] = React.useState(exerciseLog?.incline || '')
  const [calories, setCalories] = React.useState(exerciseLog?.amount || '')
  const [exerciseGroup, setExerciseGroup] = React.useState(
    exerciseLog?.groupName || 'Custom'
  )
  const [otherActivity, setOtherActivity] = React.useState(
    exerciseLog?.category || ('Baseball' as OtherActivity)
  )
  const [swimmingActivity, setSwimmingActivity] = React.useState(
    exerciseLog?.category || ('Backstroke' as SwimmingActivity)
  )
  const [liftingActivity, setLiftingActivity] = React.useState(
    exerciseLog?.category || ('Machines' as LiftingActivity)
  )

  const groupButtonStyling = css`
    min-width: 20%;

    @media (max-width: ${md}px) {
      flex: 1;
      min-width: 45%;
    }
  `

  const otherButtons = css`
    min-width: 25%;
  `

  const groupButton = (g: ExerciseGroup) => (
    <button
      onClick={() => setExerciseGroup(g)}
      type="button"
      css={groupButtonStyling}
      className={`expand background ${g === exerciseGroup ? 'active' : ''}`}
      key={g}
    >
      {g}
    </button>
  )

  const label = css`
    margin-top: 0;
  `

  return (
    <div className="w100">
      <form
        css={css`
          > div > button {
            font-size: 0.9rem;
            margin: 5px;
          }
        `}
        onSubmit={(event) => {
          event.preventDefault()
          const MET = getMETsFromInput(
            exerciseGroup,
            otherActivity as unknown as OtherActivity,
            swimmingActivity as unknown as SwimmingActivity,
            liftingActivity as unknown as LiftingActivity,
            // When metric is true, mph is actually is kph.  When metric is false, mph is mph
            metricSystem ? Number(mph) * 0.6213711922 : Number(mph),
            Number(incline),
            Number(watt)
          )
          // If MET === -1, then no valid MET was found
          // Thus, we definitely don't want to submit a request using a bad MET!
          if (MET !== -1) {
            const amount =
              // Custom is when the user just adds the calories directly
              // Hence, you don't need to calculate calories from METS
              exerciseGroup === 'Custom'
                ? Number(calories)
                : calculateCaloriesFromMETs(
                    // When metric is true, weight is kg.  When metric is false, it is lbs
                    metricSystem
                      ? Number(weight) * 2.2046226218
                      : Number(weight),
                    Number(minutes),
                    MET
                  )
            const category =
              exerciseGroup === 'Lifting'
                ? liftingActivity
                : exerciseGroup === 'Swimming'
                  ? swimmingActivity
                  : exerciseGroup === 'Other'
                    ? otherActivity
                    : null

            console.log(category)
            const dataToSubmit = {
              amount: round(amount, 0),
              category,
              duration: prep(minutes),
              groupName: exerciseGroup,
              incline: prep(incline),
              name: exerciseGroup === 'Custom' ? name : '',
              pace: prep(mph),
              power: prep(watt),
              weight: prep(weight),
            }
            if (exerciseLog?.id) {
              updateExerciseLogOnCloud(
                { pk_columns: { id: exerciseLog.id }, set: dataToSubmit },
                () => {
                  store.dispatch('closeExerciseModal')
                }
              )
            } else {
              addExerciseLogToCloud(dataToSubmit)
            }
          }
        }}
      >
        {exerciseGroup !== 'Custom' && (
          <div className="group">
            <div className="w50">
              <label htmlFor="weight">
                Weight
                <span className="pink tag">{metricSystem ? 'kg' : 'lbs'}</span>
              </label>
              <input
                placeholder="200"
                id="weight"
                onChange={(event) => {
                  updateWeight(event.target.value)
                }}
                value={weight}
                type="number"
                autoComplete={'off'}
                autoCorrect={'off'}
                autoCapitalize={'off'}
                step="any"
                required
              />
            </div>
            <div className="w50">
              <label htmlFor="minutes">
                Duration
                <span className="pink tag">Minutes</span>
              </label>
              <input
                placeholder="60"
                id="minutes"
                onChange={(event) => {
                  setMinutes(event.target.value)
                }}
                value={minutes}
                type="number"
                autoComplete={'off'}
                autoCorrect={'off'}
                autoCapitalize={'off'}
                step="any"
                required
              />
            </div>
          </div>
        )}

        {/* Group buttons */}
        <div className="fr wrap mt30 mb30 w100">
          {group.map((g) => groupButton(g))}
        </div>

        {/* Other buttons */}

        {exerciseGroup === 'Other' && (
          <div className="fr wrap">
            {Object.keys(otherMet).map((key) => (
              <button
                type="button"
                onClick={() => setOtherActivity(key as OtherActivity)}
                css={[groupButtonStyling, otherButtons]}
                className={`blue expand ${
                  key === otherActivity ? 'active' : ''
                }`}
                key={key}
              >
                {key}
              </button>
            ))}
          </div>
        )}

        {exerciseGroup === 'Swimming' && (
          <div className="fr wrap">
            {Object.keys(swimmingMET).map((key) => (
              <button
                type="button"
                onClick={() => setSwimmingActivity(key as SwimmingActivity)}
                className={`blue expand ${
                  key === swimmingActivity ? 'active' : ''
                }`}
                key={key}
              >
                {key}
              </button>
            ))}
          </div>
        )}

        {exerciseGroup === 'Lifting' && (
          <div className="fr wrap">
            {Object.keys(liftingMET).map((key) => (
              <button
                type="button"
                onClick={() => setLiftingActivity(key as LiftingActivity)}
                className={`blue expand ${
                  key === liftingActivity ? 'active' : ''
                }`}
                key={key}
              >
                {key}
              </button>
            ))}
          </div>
        )}

        {['Running', 'Cycling'].includes(exerciseGroup) && (
          <div className="group">
            <div className="w100">
              <label css={label} htmlFor="miles">
                Pace
                <span className="pink tag">{metricSystem ? 'kph' : 'mph'}</span>
              </label>
              <input
                placeholder="3"
                id="mph"
                onChange={(event) => {
                  setMph(event.target.value)
                }}
                value={mph}
                type="number"
                autoComplete={'off'}
                autoCorrect={'off'}
                autoCapitalize={'off'}
                step="any"
                required
              />
            </div>
          </div>
        )}

        {exerciseGroup === 'Rowing' && (
          <div className="group">
            <div className="w100">
              <label css={label} htmlFor="watt">
                Power
                <span className="pink tag">Watts</span>
              </label>
              <input
                placeholder="100"
                id="watt"
                onChange={(event) => {
                  setWatts(event.target.value)
                }}
                value={watt}
                type="number"
                autoComplete={'off'}
                autoCorrect={'off'}
                autoCapitalize={'off'}
                step="any"
                required
              />
            </div>
          </div>
        )}

        {exerciseGroup === 'Walking' && (
          <div className="group">
            <div className="w50">
              <label css={label} htmlFor="pace">
                Pace
                <span className="pink tag">{metricSystem ? 'kph' : 'mph'}</span>
              </label>
              <input
                placeholder="3"
                id="pace"
                onChange={(event) => {
                  setMph(event.target.value)
                }}
                value={mph}
                type="number"
                autoComplete={'off'}
                autoCorrect={'off'}
                autoCapitalize={'off'}
                step="any"
                required
              />
            </div>
            <div className="w50">
              <label css={label} htmlFor="incline">
                Incline
                <span className="pink tag">%</span>
              </label>
              <input
                placeholder="3"
                id="incline"
                onChange={(event) => {
                  setIncline(event.target.value)
                }}
                value={incline}
                type="number"
                autoComplete={'off'}
                autoCorrect={'off'}
                autoCapitalize={'off'}
                step="any"
                required
              />
            </div>
          </div>
        )}

        {exerciseGroup === 'Custom' && (
          <div className="group">
            <div className="w100">
              <div className="w100 mb20">
                <label css={label} htmlFor="calories">
                  Name (Optional)
                </label>
                <input
                  placeholder="Jai alai"
                  id="calories"
                  onChange={(event) => {
                    setName(event.target.value)
                  }}
                  value={name}
                  type="text"
                  autoComplete={'off'}
                  autoCorrect={'off'}
                  autoCapitalize={'off'}
                  step="any"
                />
              </div>
              <label css={label} htmlFor="calories">
                Calories burned
              </label>
              <input
                placeholder="100"
                id="calories"
                onChange={(event) => {
                  setCalories(event.target.value)
                }}
                value={calories}
                type="number"
                autoComplete={'off'}
                autoCorrect={'off'}
                autoCapitalize={'off'}
                step="any"
                required
              />
            </div>
          </div>
        )}

        <button type="submit" className="purple bold mt30 mb10">
          {exerciseLog?.id ? 'Edit Exercise' : 'Add Exercise'}
        </button>
      </form>
    </div>
  )
}
