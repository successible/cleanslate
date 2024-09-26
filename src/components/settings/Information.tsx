import { css } from '@emotion/react'
import { useState } from 'react'
import { updateProfileOnCloud } from '../../helpers/profile/updateProfileOnCloud'
import { useUser } from '../../hooks/useUser'
import { Profile } from '../../models/profile'
import { Explanation } from '../explanation/Explanation'
import { subheader } from './Settings'
import { toast } from 'react-toastify'
import { debounce } from 'lodash-es'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'
import { getDomain } from '../../helpers/getDomain'

type props = { profile: Profile }

export const Information: React.FC<props> = ({ profile }) => {
  const user = useUser()
  const [showCalories, setShowCalories] = useState(() => {
    return profile.showCalories
  })
  const [showDensities, setShowDensities] = useState(profile.showDensities)
  const [hidePWAPrompt, setHidePWAPrompt] = useState(profile.hidePWAPrompt)
  const [countDown, setCountDown] = useState(profile.countDown)
  const [enablePlanning, setEnablePlanning] = useState(profile.enablePlanning)
  const [enableMetricSystem, setEnableMetricSystem] = useState(
    profile.metricSystem
  )
  const [startTime, setStartTime] = useState(profile.startTime)
  const userLoaded = user && user !== 'PENDING'

  const info =
    userLoaded && 'token' in user
      ? '&' + user.token
      : userLoaded && (user.email || user.providerData[0]?.email)

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
              {info[0] === '&' ? 'Username:' : 'Username:'}
            </strong>
            {info[0] === '&' ? info.slice(1) : info}
          </>
        )}
      </div>

      <div className="ml5 mt5">
        <>
          <strong className="mr5">Version:</strong>
          {process.env.NEXT_PUBLIC_VERSION}
        </>
      </div>
      <div className="ml5 mt5">
        <>
          <strong className="mr5">API token:</strong>
          {profile.apiToken}
        </>
        <Explanation color="background">
          <div>
            To learn how to make an API request, view the <a href="https://github.com/successible/cleanslate/blob/main/README.md#how-can-i-make-an-api-request-to-clean-slate">README</a> and the {' '}
            <a href="https://studio.apollographql.com/graph/Clean-Slate/variant/current/home">
              GraphQL schema.
            </a>
          </div>
        </Explanation>
      </div>

      <div
        css={subheader}
        className={`pbutton rounded green nohover mt30 mb20`}
      >
        Preferences
      </div>
      <div className="fr ml5">
        <label className="fr" htmlFor='startTime'>
          <span className="mr10" css={itemLabelStyling}>
            Start time
          </span>
          <input
            value={startTime}
            onChange={(e) => {
              setStartTime(e.target.value)
            }}
            id="startTime"
            type="time"
          />
        </label>
        <button onClick={() => {
          const midnight = dayjs().startOf('day')
          const [hour, minute] = startTime.split(':').map(Number)
          const today = midnight
            .set('hour', hour)
            .set('minute', minute)
           const useFrameChange =  (today.unix() <= dayjs().unix()) ? null : today.toISOString()
           updateProfileOnCloud(
            { id: profile.id, set: { startTime, timeToExecuteFrameChange: useFrameChange }},
            () => {
              if (!useFrameChange) {
                Cookies.remove("last-reset")
              }
              toast.success("Settings updated!")
            }
          )
        }} type='button' className="purple bold ml15">Save</button>
      </div>
      <Explanation className='mt20 mb20' color='blue'>
        <div>
          Control when the day is restarted. Default is 12:00 AM to restart the logs at midnight.
        </div>
      </Explanation>
      <div className="fr ml5">
        <label className="fr"  htmlFor="showCalories">
          <span className="mr10" css={itemLabelStyling}>
            Show calories
          </span>
          <input
            checked={showCalories}
            onChange={(e) => {
              const checked = e.target.checked
              updateProfileOnCloud(
                { id: profile.id, set: { showCalories: checked } },
                () => {
                  setShowCalories(checked)
                }
              )
              toast.success("Settings updated!")
            }}
            id="showCalories"
            type="checkbox"
          />
        </label>
      </div>
      <div className="fr ml5">
        <label className="fr" htmlFor='countDown'>
          <span className="mr10" css={itemLabelStyling}>
            Calories {'&'} protein count down
          </span>
          <input
            checked={countDown}
            onChange={(e) => {
              const checked = e.target.checked
              updateProfileOnCloud(
                { id: profile.id, set: { countDown: checked } },
                () => {
                  setCountDown(checked)
                }
              )
              toast.success("Settings updated!")
            }}
            id="countDown"
            type="checkbox"
          />
        </label>
      </div>
      <div className="fr ml5">
        <label className="fr" htmlFor='enableMetricSystem'>
          <span className="mr10" css={itemLabelStyling}>
            Use the metric system
          </span>
          <input
            checked={enableMetricSystem}
            onChange={(e) => {
              const checked = e.target.checked
              updateProfileOnCloud(
                { id: profile.id, set: { metricSystem: checked } },
                () => {
                  setEnableMetricSystem(checked)
                }
              )
              toast.success("Settings updated!")
            }}
            id="enableMetricSystem"
            type="checkbox"
          />
        </label>
      </div>
      <div className="fr ml5">
        <label className="fr" htmlFor='enablePlanning'>
          <span className="mr10" css={itemLabelStyling}>
            Enable planning the day
          </span>
          <input
            checked={enablePlanning}
            onChange={(e) => {
              const checked = e.target.checked
              updateProfileOnCloud(
                { id: profile.id, set: { enablePlanning: checked } },
                () => {
                  setEnablePlanning(checked)
                }
              )
              toast.success("Settings updated!")
            }}
            id="enablePlanning"
            type="checkbox"
          />
        </label>
      </div>

      <div className="fr ml5">
        <label className="fr" htmlFor='showDensities'>
          <span className="mr10" css={itemLabelStyling}>
            Show density of each food
          </span>
           <input
            checked={showDensities}
            onChange={(e) => {
              const checked = e.target.checked
              updateProfileOnCloud(
                { id: profile.id, set: { showDensities: checked } },
                () => {
                  setShowDensities(checked)
                }
              )
              toast.success("Settings updated!")
            }}
            id="showDensities"
            type="checkbox"
          />
        </label>
      </div>

      <div className="fr ml5">
        <label className="fr" htmlFor='hidePWAPrompt'>
          <span className="mr10" css={itemLabelStyling}>
            Hide prompt to download app
          </span>
          <input
            checked={hidePWAPrompt}
            onChange={(e) => {
              const checked = e.target.checked
              updateProfileOnCloud(
                { id: profile.id, set: { hidePWAPrompt: checked } },
                () => {
                  setHidePWAPrompt(checked)
                }
              )
              toast.success("Settings updated!")
            }}
            id="hidePWAPrompt"
            type="checkbox"
          />
        </label>
      </div>
    </div>
  )
}
