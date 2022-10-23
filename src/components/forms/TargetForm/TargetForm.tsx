import { css } from '@emotion/react'
import React from 'react'
import { useStoreon } from 'storeon/react'
import { updateProfileOnCloud } from '../../../models/Profile/helpers/updateProfileOnCloud'
import { Profile } from '../../../models/Profile/model'
import { AllEvents } from '../../../store/store'
import { Dispatch } from '../../../store/types'
import { Divider } from '../../divider/Divider'
import { Explanation } from '../../explanation/Explanation'
import { CalculateTargetForm } from '../CalculateTargetForm/CalculateTargetForm'

type props = { profile: Profile }

export const TargetForm: React.FC<props> = ({ profile }) => {
  const [calorieTarget, updateCalorieTarget] = React.useState(
    profile?.calorieTarget || ''
  )
  const [proteinTarget, updateProteinTarget] = React.useState(
    profile?.proteinTarget || ''
  )

  const {
    dispatch,
  }: {
    dispatch: Dispatch<AllEvents>
  } = useStoreon()

  const data = {
    calorieTarget,
    proteinTarget,
  }

  const explanation = css`
    font-size: 0.95rem !important;
    width: 90% !important;
  `

  return (
    <div className="w100">
      <div className="w100">
        {profile && (
          <div>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                const variables = { id: profile.id, set: data }
                updateProfileOnCloud(variables, () => {
                  dispatch('closeTargetModal')
                })
              }}
            >
              <div className="group">
                <div className="w50">
                  <label className="fr" htmlFor="calorieTarget">
                    Calories
                  </label>
                  <input
                    required
                    id="calorieTarget"
                    onChange={(event) => {
                      updateCalorieTarget(event.target.value)
                    }}
                    value={data.calorieTarget}
                    type="number"
                    autoComplete={'off'}
                    autoCorrect={'off'}
                    autoCapitalize={'off'}
                    step="any"
                  />
                </div>
                <div className="w50">
                  <label className="fr" htmlFor="proteinTarget">
                    Protein
                  </label>
                  <input
                    required
                    id="proteinTarget"
                    onChange={(event) => {
                      updateProteinTarget(event.target.value)
                    }}
                    value={data.proteinTarget}
                    type="number"
                    autoComplete={'off'}
                    autoCorrect={'off'}
                    autoCapitalize={'off'}
                    step="any"
                  />
                </div>
              </div>
              <button type="submit" className="purple bold mt20">
                Update
              </button>
            </form>
            <Divider height={5} className="mt30 mb30 w90 center" />
            <Explanation styles={explanation} color="blue">
              Personalize the default calorie and protein numbers with this
              form.
            </Explanation>
            <CalculateTargetForm profile={profile} />
          </div>
        )}
      </div>
    </div>
  )
}
