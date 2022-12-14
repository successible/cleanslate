import { useState } from 'react'
import Switch from 'react-switch'
import { subscribeToUser } from '../../helpers/authentication/subscribeToUser'
import { updateProfileOnCloud } from '../../models/Profile/helpers/updateProfileOnCloud'
import { Profile } from '../../models/Profile/model'
import { spawnAlert } from '../alert/helpers/spawnAlert'
import { subheader } from './Settings'

type props = { profile: Profile }

export const Information: React.FC<props> = ({ profile }) => {
  const user = subscribeToUser()
  const [showCalories, setShowCalories] = useState(profile.showCalories)
  const [showDensities, setShowDensities] = useState(profile.showDensities)
  const [hidePWAPrompt, setHidePWAPrompt] = useState(profile.hidePWAPrompt)

  const [startTime, setStartTime] = useState(profile.startTime)

  const info =
    user &&
    user !== 'PENDING' &&
    (user.email || user.providerData[0]?.email || user.phoneNumber)

  const infoText = info && (
    <div>
      <strong className="mr5">{info[0] === '+' ? 'Phone:' : 'Email:'}</strong>
      {info}
    </div>
  )

  return (
    <div className="w100 mt10">
      <div css={subheader} className={`pbutton rounded blue nohover mt20 mb20`}>
        Profile
      </div>
      <div className="ml5">{infoText}</div>
      <div className="ml5 mt20">
        <strong className="mr5">Start time (24 Hours: HH:MM:SS)</strong>
        <div className="fr mt15">
          <input
            placeholder="00:00:00"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <button
            className="purple ml10 bold"
            type="button"
            onClick={() => {
              if (startTime === '' || !/\d\d:\d\d:\d\d/.test(startTime)) {
                return spawnAlert(
                  'The format of your start time must be 24 hour time. Example: 22:00:00',
                  'danger'
                )
              }
              updateProfileOnCloud(
                { id: profile.id, set: { startTime } },
                () => {
                  spawnAlert('Your settings have been updated!', 'success')
                }
              )
            }}
          >
            Save
          </button>
        </div>
      </div>

      <div
        css={subheader}
        className={`pbutton rounded green nohover mt30 mb20`}
      >
        Preferences
      </div>
      <div className="mt20">
        <div className="fr mt20 ml5">
          <label className="fr">
            <span className="mr10">Track only food, not calories</span>
            <Switch
              onChange={(data) => {
                updateProfileOnCloud(
                  { id: profile.id, set: { showCalories: !data } },
                  () => {
                    setShowCalories(!data)
                    spawnAlert('Your settings have been updated!', 'success')
                  }
                )
              }}
              checked={!showCalories}
            />
          </label>
        </div>
        <div className="fr mt20 ml5">
          <label className="fr">
            <span className="mr10">Show the density of each food</span>
            <Switch
              onChange={(data) => {
                updateProfileOnCloud(
                  { id: profile.id, set: { showDensities: data } },
                  () => {
                    setShowDensities(data)
                    spawnAlert('Your settings have been updated!', 'success')
                  }
                )
              }}
              checked={showDensities}
            />
          </label>
        </div>
        <div className="fr mt20 ml5">
          <label className="fr">
            <span className="mr10">Hide prompt to download app</span>
            <Switch
              onChange={(data) => {
                updateProfileOnCloud(
                  { id: profile.id, set: { hidePWAPrompt: data } },
                  () => {
                    setHidePWAPrompt(data)
                    spawnAlert('Your settings have been updated!', 'success')
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
