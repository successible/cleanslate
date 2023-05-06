import { css } from '@emotion/react'
import { useState } from 'react'
import Switch from 'react-switch'
import { updateProfileOnCloud } from '../../helpers/profile/updateProfileOnCloud'
import { useUser } from '../../hooks/useUser'
import { Profile } from '../../models/profile'
import { subheader } from './Settings'

type props = { profile: Profile }

export const Information: React.FC<props> = ({ profile }) => {
  const user = useUser()
  const [showCalories, setShowCalories] = useState(profile.showCalories)
  const [showDensities, setShowDensities] = useState(profile.showDensities)
  const [hidePWAPrompt, setHidePWAPrompt] = useState(profile.hidePWAPrompt)
  const [countDown, setCountDown] = useState(profile.countDown)
  const [enablePlanning, setEnablePlanning] = useState(profile.enablePlanning)
  const [enableMetricSystem, setEnableMetricSystem] = useState(
    profile.metricSystem
  )
  const [convertBetweenUnits, setConvertBetweenUnits] = useState(
    profile.convertBetweenUnits
  )

  const info =
    user &&
    user !== 'PENDING' &&
    (user.email || user.providerData[0]?.email || user.phoneNumber)

  const itemLabelStyling = css`
    width: 230px;
  `

  return (
    <div className="w100 mt10">
      <div css={subheader} className={`pbutton rounded blue nohover mt20 mb20`}>
        Profile
      </div>
      <div className="ml5">
        {info && (
          <>
            <strong className="mr5">
              {info[0] === '+' ? 'Phone:' : 'Email:'}
            </strong>
            {info}
          </>
        )}
      </div>

      <div className="ml5 mt5">
        <>
          <strong className="mr5">Version:</strong>
          {process.env.NEXT_PUBLIC_VERSION}
        </>
      </div>

      <div
        css={subheader}
        className={`pbutton rounded green nohover mt30 mb20`}
      >
        Preferences
      </div>
      <div className="fr mt20 ml5">
        <label className="fr">
          <span className="mr10" css={itemLabelStyling}>
            Use the metric system
          </span>
          <Switch
            onChange={(data) => {
              updateProfileOnCloud(
                { id: profile.id, set: { metricSystem: data } },
                () => {
                  setEnableMetricSystem(data)
                }
              )
            }}
            checked={enableMetricSystem}
          />
        </label>
      </div>
      <div className="mt20">
        <div className="fr mt20 ml5">
          <label className="fr">
            <span className="mr10" css={itemLabelStyling}>
              Do not show calories
            </span>
            <Switch
              onChange={(data) => {
                updateProfileOnCloud(
                  { id: profile.id, set: { showCalories: !data } },
                  () => {
                    setShowCalories(!data)
                  }
                )
              }}
              checked={!showCalories}
            />
          </label>
        </div>
        <div className="fr mt20 ml5">
          <label className="fr">
            <span className="mr10" css={itemLabelStyling}>
              Enable planning the day
            </span>
            <Switch
              onChange={(data) => {
                updateProfileOnCloud(
                  { id: profile.id, set: { enablePlanning: data } },
                  () => {
                    setEnablePlanning(data)
                  }
                )
              }}
              checked={enablePlanning}
            />
          </label>
        </div>
        <div className="fr mt20 ml5">
          <label className="fr">
            <span className="mr10" css={itemLabelStyling}>
              Calories {'&'} protein count up
            </span>
            <Switch
              onChange={(data) => {
                updateProfileOnCloud(
                  { id: profile.id, set: { countDown: !data } },
                  () => {
                    setCountDown(!data)
                  }
                )
              }}
              checked={!countDown}
            />
          </label>
        </div>
        <div className="fr mt20 ml5">
          <label className="fr">
            <span className="mr10" css={itemLabelStyling}>
              Show density of each food
            </span>
            <Switch
              onChange={(data) => {
                updateProfileOnCloud(
                  { id: profile.id, set: { showDensities: data } },
                  () => {
                    setShowDensities(data)
                  }
                )
              }}
              checked={showDensities}
            />
          </label>
        </div>
        <div className="fr mt20 ml5">
          <label className="fr">
            <span className="mr10" css={itemLabelStyling}>
              Convert between units
            </span>
            <Switch
              onChange={(data) => {
                updateProfileOnCloud(
                  { id: profile.id, set: { convertBetweenUnits: data } },
                  () => {
                    setConvertBetweenUnits(data)
                  }
                )
              }}
              checked={convertBetweenUnits}
            />
          </label>
        </div>
        <div className="fr mt20 ml5">
          <label className="fr">
            <span className="mr10" css={itemLabelStyling}>
              Hide prompt to download app
            </span>
            <Switch
              onChange={(data) => {
                updateProfileOnCloud(
                  { id: profile.id, set: { hidePWAPrompt: data } },
                  () => {
                    setHidePWAPrompt(data)
                  }
                )
              }}
              checked={hidePWAPrompt}
            />
          </label>
        </div>
      </div>
    </div>
  )
}
