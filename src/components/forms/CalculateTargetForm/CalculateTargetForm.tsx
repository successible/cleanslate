import { css } from '@emotion/react'
import React from 'react'
import { useStoreon } from 'storeon/react'
import { updateProfileOnCloud } from '../../../models/Profile/helpers/updateProfileOnCloud'
import { Profile } from '../../../models/Profile/model'
import { Sex } from '../../../store/navbar/types'
import { AllEvents } from '../../../store/store'
import { Dispatch } from '../../../store/types'
import { spawnAlert } from '../../alert/helpers/spawnAlert'
import { Tabs } from '../../tabs/Tabs'
import { calculateBMRUsingKatchMcardle } from './helpers/calculateBMR'
import { calculateBodyFatPercentage } from './helpers/calculateBodyFatPercentage'
import { calculateCalorieTarget } from './helpers/calculateCalorieTarget'
import { calculateIBW } from './helpers/calculateIBW'

type props = { profile: Profile; onUpdate?: () => void }
export const CalculateTargetForm: React.FC<props> = ({ profile }) => {
  const [weight, updateWeight] = React.useState('')
  const [height, updateHeight] = React.useState(64)
  const [liftWeights, setLiftWeights] = React.useState(false)

  const [sex, updateSex] = React.useState('male' as Sex)
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

            const estimatedBodyFatPercentage =
              calculateBodyFatPercentage(
                Number(weight),
                Number(height),
                sex,
                Number(age)
              ) / 100

            const BMR = calculateBMRUsingKatchMcardle(
              Number(weight),
              estimatedBodyFatPercentage
            )

            const PA = 1.15
            const TDEE = BMR * PA // Adjusting for thermic effect of food
            // Using the smaller 1.1 multiplier for PA:  https://legionathletics.com/tdee-calculator/
            const calorieTarget = Math.round(calculateCalorieTarget(TDEE))
            const IBW = calculateIBW(sex, Number(height))
            const LBM =
              (Number(weight) * (1 - estimatedBodyFatPercentage)) / 2.2
            const proteinTarget =
              liftWeights === true
                ? // Using the 1.6/2.2 g/kg rule
                  // https://bjsm.bmj.com/content/52/6/376.full?fbclid=IwAR2Hn-sPcLthyGUr6x3bJHJ4CA7h7wHEB83GhKmstCtYSG_yIh100tJUHQp3s
                  Math.round(1.6 * LBM)
                : // Using the Cleveland Clinic PSMF rule
                  // https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4784653
                  Math.round(1.2 * IBW)
            const variables = {
              id: profile.id,
              set: {
                calorieTarget: calorieTarget,
                proteinTarget: proteinTarget,
              },
            }
            updateProfileOnCloud(variables, () => {
              dispatch('closeTargetModal')
              spawnAlert(
                'Your numbers have been updated',
                'success',
                () => {},
                3000
              )
            })
          }}
        >
          <div className="group expand">
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
          </div>
          <div className="group">
            <div className="w50">
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
                placeholder="150"
              />
            </div>
            <div className="w50">
              <label htmlFor="height">
                Height
                <span className="tag pink">feet/inches</span>
              </label>
              <select
                required
                id="height"
                value={height}
                className="unit-input"
                onChange={(event) => {
                  updateHeight(Number(event.target.value))
                }}
              >
                {Array.from(Array(37).keys())
                  .map((number) => number + 48)
                  .map((number, index) => {
                    const feet = Math.floor(number / 12)
                    const inches = number - feet * 12
                    return (
                      <option value={number} key={index}>
                        {`${feet}'${inches}''`}
                      </option>
                    )
                  })}
              </select>
            </div>
          </div>

          <div className="fr mb10">
            <label htmlFor="liftWeights">Do you lift weights?</label>
            <input
              onChange={(event) => setLiftWeights(event.target.checked)}
              checked={liftWeights}
              type="checkbox"
              id="liftWeights"
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
