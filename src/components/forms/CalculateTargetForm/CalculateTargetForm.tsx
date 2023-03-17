import { css } from '@emotion/react'
import React from 'react'
import Switch from 'react-switch'
import { useStoreon } from 'storeon/react'
import { updateProfileOnCloud } from '../../../helpers/profile/updateProfileOnCloud'
import { Profile } from '../../../models/profile'
import { Sex } from '../../../store/navbar/types'
import { AllEvents } from '../../../store/store'
import { Dispatch } from '../../../store/types'
import { lg } from '../../../theme'
import { Tabs } from '../../tabs/Tabs'
import { calculateTargets } from './helpers/calculateTargets'

export type Goal = 'fat' | 'muscle' | 'maintain'

type props = { profile: Profile; onUpdate?: () => void }
export const CalculateTargetForm: React.FC<props> = ({ profile }) => {
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
            const { calorieTarget, proteinTarget } = calculateTargets(
              age,
              sex,
              weight,
              feet,
              inches,
              liftWeights,
              goal
            )
            const variables = {
              id: profile.id,
              set: {
                calorieTarget: calorieTarget,
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
              <label htmlFor="goal">What is your goal?</label>
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
                <span className="tag pink">lbs</span>
              </label>
              <input
                id="currentWeight"
                onChange={(event) => {
                  updateWeight(event.target.value)
                }}
                value={weight}
                type="number"
                autoComplete={'off'}
                autoCorrect={'off'}
                autoCapitalize={'off'}
                step="any"
                placeholder="160"
                required
              />
            </div>
            <div className="expand">
              <label htmlFor="height">
                Height
                <span className="tag pink">feet</span>
                <span className="tag pink">inches</span>
              </label>
              <div className="frc">
                <input
                  id="currentFeet"
                  onChange={(event) => {
                    updateFeet(event.target.value)
                  }}
                  value={feet}
                  type="number"
                  autoComplete={'off'}
                  autoCorrect={'off'}
                  autoCapitalize={'off'}
                  step="any"
                  placeholder="5"
                  required
                />
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
              </div>
            </div>
          </div>

          <div className="fr mb10 mt10">
            <label htmlFor="liftWeights">Do you lift weights?</label>
            <Switch
              className="ml20 mt5"
              id="liftWeights"
              onChange={(data) => {
                setLiftWeights(data)
              }}
              checked={liftWeights}
            />
          </div>
          <button type="submit" className="purple bold">
            Calculate
          </button>
        </form>
      </div>
    </div>
  )
}
