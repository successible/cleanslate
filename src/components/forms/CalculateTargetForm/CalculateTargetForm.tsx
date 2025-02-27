import { css } from '@emotion/react'
import React from 'react'
import { updateProfileOnCloud } from '../../../helpers/profile/updateProfileOnCloud'
import type { Profile } from '../../../models/profile'
import type { Sex } from '../../../store/navbar/types'
import type { AllEvents } from '../../../store/store'
import type { Dispatch } from '../../../store/types'
import { useStoreon } from '../../../storeon'
import { lg } from '../../../theme'
import { Tabs } from '../../tabs/Tabs'
import { calculateTargets } from './helpers/calculateTargets'

export type Goal = 'fat' | 'muscle' | 'maintain'
export type MeasurementSystem = 'imperial' | 'metric'

type props = { profile: Profile; onUpdate?: () => void }
export const CalculateTargetForm: React.FC<props> = ({ profile }) => {
  const [metricSystem, setMetricSystem] = React.useState(
    Boolean(profile.metricSystem)
  )
  const [weight, updateWeight] = React.useState('')
  const [feet, updateFeet] = React.useState('')
  const [inches, updateInches] = React.useState('')

  const [liftWeights, setLiftWeights] = React.useState(false)

  const [sex, updateSex] = React.useState('female' as Sex)
  const [goal, updateGoal] = React.useState('maintain' as Goal)

  const [age, updateAge] = React.useState('')

  const {
    dispatch,
  }: {
    dispatch: Dispatch<AllEvents>
  } = useStoreon()

  return (
    <div>
      <div>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            const result = calculateTargets(
              metricSystem,
              age,
              sex,
              weight,
              feet,
              inches,
              liftWeights,
              goal
            )
            console.log(result)
            const { calorieTarget, proteinTarget } = result
            const variables = {
              id: profile.id,
              set: {
                calorieTarget: calorieTarget,
                metricSystem,
                proteinTarget: proteinTarget,
              },
            }
            updateProfileOnCloud(variables, () => {
              dispatch('closeTargetModal')
            })
          }}
        >
          <div className="group expand">
            <div className="w100">
              <label className="mt25" htmlFor="goal">
                What is your goal?
              </label>
              <Tabs
                css={css`
                  font-size: 0.8rem !important;
                  margin-bottom: 10px;
                  @media (max-width: ${lg}px) {
                    > button {
                      min-width: 100%;
                      margin: 5px;
                    }
                  }
                `}
                selected={goal}
                tabs={{
                  fat: {
                    image: '',
                    title: 'Lose fat',
                  },
                  maintain: {
                    image: '',
                    title: 'Maintain weight',
                  },
                  muscle: {
                    image: '',
                    title: 'Gain muscle',
                  },
                }}
                onSelect={(tab) => {
                  updateGoal(tab as Goal)
                }}
              />
            </div>
          </div>
          <div className="group expand">
            <div className="fr mt10 mb0">
              <label htmlFor="metricSystem" className="mt0 mb0">
                Use the metric system?
                <input
                  checked={metricSystem}
                  onChange={(e) => {
                    const checked = e.target.checked
                    setMetricSystem(checked)
                  }}
                  id="metricSystem"
                  type="checkbox"
                />
              </label>
            </div>
          </div>

          <div className="group expand">
            <div className="w50">
              <label htmlFor="age">
                Age
                <span className="tag pink">years</span>
              </label>
              <input
                required
                id="age"
                onChange={(event) => {
                  updateAge(event.target.value)
                }}
                value={age}
                type="number"
                autoComplete={'off'}
                autoCorrect={'off'}
                autoCapitalize={'off'}
                step="any"
                placeholder={'40'}
              />
            </div>
            <div className="w50">
              <label htmlFor="sex">
                Gender
                <span className="tag pink">preferred</span>
              </label>
              <Tabs
                css={css`
                  font-size: 0.8rem !important;
                  height: 41px !important;
                `}
                selected={sex}
                tabs={{
                  female: {
                    image: '',
                    title: 'Female',
                  },
                  male: {
                    image: '',
                    title: 'Male',
                  },
                  other: {
                    image: '',
                    title: 'Other',
                  },
                }}
                onSelect={(tab) => {
                  updateSex(tab as Sex)
                }}
              />
            </div>
          </div>
          <div className="group">
            <div className="expand">
              <label htmlFor="currentWeight">
                Weight
                <span className="tag pink">{metricSystem ? 'kg' : 'lbs'}</span>
              </label>
              <input
                id={metricSystem ? 'currentKg' : 'currentLbs'}
                onChange={(event) => {
                  updateWeight(event.target.value)
                }}
                value={weight}
                type="number"
                autoComplete={'off'}
                autoCorrect={'off'}
                autoCapitalize={'off'}
                step="any"
                placeholder={metricSystem ? '70' : '160'}
                required
              />
            </div>
            <div className="expand">
              <label htmlFor="height">
                Height
                <span className="tag pink">{metricSystem ? 'cm' : 'feet'}</span>
                {!metricSystem && <span className="tag pink">inches</span>}
              </label>
              <div className="frc">
                <input
                  id={metricSystem ? 'currentCm' : 'currentFeet'}
                  onChange={(event) => {
                    updateFeet(event.target.value)
                  }}
                  value={feet}
                  type="number"
                  autoComplete={'off'}
                  autoCorrect={'off'}
                  autoCapitalize={'off'}
                  step="any"
                  placeholder={metricSystem ? '80' : '5'}
                  required
                />
                {!metricSystem && (
                  <input
                    className="ml10"
                    id="currentInches"
                    onChange={(event) => {
                      updateInches(event.target.value)
                    }}
                    value={inches}
                    type="number"
                    autoComplete={'off'}
                    autoCorrect={'off'}
                    autoCapitalize={'off'}
                    step="any"
                    placeholder="8"
                    required
                  />
                )}
              </div>
            </div>
          </div>

          <div className="group expand">
            <div className="fr mt10 mb10">
              <label htmlFor="liftWeights">
                Do you lift weights?
                <input
                  checked={liftWeights}
                  onChange={(e) => {
                    const checked = e.target.checked
                    setLiftWeights(checked)
                  }}
                  id="liftWeights"
                  type="checkbox"
                />
              </label>
            </div>
          </div>

          <button type="submit" className="purple bold">
            Calculate
          </button>
        </form>
      </div>
    </div>
  )
}
