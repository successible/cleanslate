import { css } from '@emotion/react'
import React from 'react'
import { updateProfileOnCloud } from '../../../helpers/profile/updateProfileOnCloud'
import { Profile } from '../../../models/profile'
import { AllEvents } from '../../../store/store'
import { Dispatch } from '../../../store/types'
import { Divider } from '../../divider/Divider'
import { Explanation } from '../../explanation/Explanation'
import { CalculateTargetForm } from '../CalculateTargetForm/CalculateTargetForm'
import { useStoreon } from '../../../storeon'

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
              <div className="group fr">
                <div className="expand">
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
                <div className="expand">
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
                <div>
                  <label className="opaque">Update</label>
                  <button type="submit" className="purple bold">
                    Update
                  </button>
                </div>
              </div>
            </form>
            <Divider height={5} className="mt30 mb30 w90 center" />
            <Explanation styles={explanation} color="blue">
              Personalize your numbers with this form
            </Explanation>
            <CalculateTargetForm profile={profile} />
          </div>
        )}
      </div>
    </div>
  )
}
