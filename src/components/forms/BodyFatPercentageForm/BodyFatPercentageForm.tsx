import React from 'react'
import { round } from '../../../helpers/round'
import { Sex } from '../../../store/navbar/types'
import { Explanation } from '../../explanation/Explanation'
import { calculateBFUsingNavyMethod } from './helpers/calculateBFUsingNavyMethod'

// Currently not in use as we estimate BF% from BMI
export const BodyFatPercentageForm = () => {
  const [feet, updateFeet] = React.useState('')
  const [inches, updateInches] = React.useState('')
  const [sex, updateSex] = React.useState('male' as Sex)

  const [waist, setWaist] = React.useState('')
  const [neck, setNeck] = React.useState('')
  const [hip, setHip] = React.useState('')

  const [bodyFatPercentage, setBodyFatPercentage] = React.useState(0)

  return (
    <div className="target-form">
      <div>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            const height = Number(feet) * 12 + Number(inches)
            const BF = calculateBFUsingNavyMethod(
              sex,
              height,
              Number(waist),
              Number(neck),
              Number(hip)
            )
            setBodyFatPercentage(BF)
          }}
        >
          {bodyFatPercentage > 0 && (
            <Explanation color="green">
              <div>
                Your body fat percentage is{' '}
                <span>{round(bodyFatPercentage, 1)}%</span>
              </div>
            </Explanation>
          )}
          <div className="fc">
            <label>
              Sex
              <span className="tag info">Assigned at birth</span>
            </label>
            <div className="fr">
              <label className="fr">
                <input
                  type="radio"
                  value="male"
                  onChange={() => updateSex('male')}
                  checked={sex === 'male'}
                />
                <span>Male</span>
              </label>
              <label className="fr">
                <input
                  type="radio"
                  value="female"
                  onChange={() => updateSex('female')}
                  checked={sex === 'female'}
                />
                <span>Female</span>
              </label>
            </div>
          </div>

          <div className="section target-form-height">
            <div>
              <label htmlFor="feet">Feet</label>
              <input
                required
                id="feet"
                onChange={(event) => {
                  updateFeet(event.target.value)
                }}
                value={feet}
                type="number"
                autoComplete={'off'}
                autoCorrect={'off'}
                autoCapitalize={'off'}
                step="any"
              />
            </div>
            <div>
              <label htmlFor="inches">Inches</label>
              <input
                required
                id="inches"
                onChange={(event) => {
                  updateInches(event.target.value)
                }}
                value={inches}
                type="number"
                autoComplete={'off'}
                autoCorrect={'off'}
                autoCapitalize={'off'}
                step="any"
              />
            </div>
          </div>

          <div className="section target-form-measurements">
            <div className="form-alert expand information">
              How to measure:
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.youtube.com/watch?v=CdtIb5VojUQ"
              >
                {' '}
                Man
              </a>
              |
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.youtube.com/watch?v=bATNkP4w-jk"
              >
                {' '}
                Woman
              </a>
            </div>
            <div>
              <label htmlFor="waist">
                Waist
                <span className="tag info">Inches</span>
              </label>
              <input
                id="waist"
                onChange={(event) => {
                  setWaist(event.target.value)
                }}
                value={waist}
                type="number"
                autoComplete={'off'}
                autoCorrect={'off'}
                autoCapitalize={'off'}
                step="any"
              />
            </div>
            <div>
              <label htmlFor="neck">
                Neck
                <span className="tag info">Inches</span>
              </label>
              <input
                id="neck"
                onChange={(event) => {
                  setNeck(event.target.value)
                }}
                value={neck}
                type="number"
                autoComplete={'off'}
                autoCorrect={'off'}
                autoCapitalize={'off'}
                step="any"
              />
            </div>
            {sex === 'female' && (
              <div>
                <label htmlFor="hip">Hip (inches)</label>
                <input
                  id="hip"
                  onChange={(event) => {
                    setHip(event.target.value)
                  }}
                  value={hip}
                  type="number"
                  autoComplete={'off'}
                  autoCorrect={'off'}
                  autoCapitalize={'off'}
                  step="any"
                />
              </div>
            )}
          </div>

          <button type="submit" className="purple target-form-submit-button">
            Calculate body fat %
          </button>
        </form>
      </div>
    </div>
  )
}
