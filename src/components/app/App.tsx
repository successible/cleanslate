import { css } from '@emotion/react'
import { executeKeyboardShortcuts } from '../../helpers/executeShortcuts'
import { useData } from '../../hooks/useData'
import { useLogoutOtherTab } from '../../hooks/useLogoutOtherTab'
import { usePWAPrompt } from '../../hooks/usePWAPrompt'
import { useShortcuts } from '../../hooks/useShortcuts'
import { useStartTime } from '../../hooks/useStartTime'
import { useUser } from '../../hooks/useUser'
import { Body } from '../body/Body'
import { BottomBar } from '../bottom-bar/BottomBar'
import { BottomBarButtons } from '../bottom-bar-buttons/BottomBarButtons'
import { ExerciseLogList } from '../list/ExerciseLogList/ExerciseLogList'
import { LogList } from '../list/Log/LogList'
import { QuickLogList } from '../list/QuickLog/QuickLogList'
import Modals from '../modals/Modals'
import { Numbers } from '../numbers/Numbers'
import { TopBar } from '../top-bar/TopBar'
import { gql, useSubscription } from '@apollo/client'
import { SUBSCRIBE_TO_DATA } from '../../graphql/profile'
import { createDateRange } from '../../helpers/createDateRange'
import { stringifyQuery } from '../../helpers/stringifyQuery'
import { Data } from '../../store/data/types'
import { handleData } from '../../helpers/handleData'
import { useEffect } from 'react'
import { isLoadedUser } from '../../helpers/isLoadedUser'
import { getLoginStatus } from '../../helpers/getLoginStatus'
import { updateProfileOnCloud } from '../../helpers/profile/updateProfileOnCloud'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'

export const App = () => {
  useStartTime()

  const {
    dispatch,
    exercise_logs,
    foods,
    logs,
    profile,
    quick_logs,
    recipes,
  } = useData()

  const user = useUser()
  const { data, loading } = useSubscription<Data>(gql(stringifyQuery(SUBSCRIBE_TO_DATA)), {variables: createDateRange(profile) })
  useEffect(() => {
    if (!loading && data && isLoadedUser(user) && getLoginStatus()) {
      handleData(data)
    }
  }, [loading, data, user])

  useShortcuts(executeKeyboardShortcuts)
  usePWAPrompt(profile, dispatch)
  useLogoutOtherTab()

  const navbarHeight = 65
  const footerHeight = 65

  useEffect(() => {
    if (!loading && profile.timeToExecuteFrameChange) {
      if (dayjs(profile.timeToExecuteFrameChange).unix() < dayjs().unix()) [
        updateProfileOnCloud(
          { id: profile.id, set: { timeToExecuteFrameChange: null} },
          () => {
            Cookies.remove("last-reset")
            window.location.reload()
          }
        )
      ]
    }
  }, [loading, profile])

  return (
    <div
      id="app"
      className="no-scroll"
      suppressHydrationWarning={true}
      css={css`
        #macros {
          span {
            display: ${profile.showCalories ? 'inline-block' : 'none'};
          }
        }
      `}
    >
      <TopBar
        height={navbarHeight}
        onClick={() =>
          profile.showCalories ? dispatch('openTargetModal') : undefined
        }
      >
        <Numbers
          profile={profile}
          logs={logs}
          quick_logs={quick_logs}
          exercise_logs={exercise_logs}
        />
      </TopBar>

      <Body navbar={navbarHeight} footer={footerHeight} profile={profile}>
        <ExerciseLogList exercise_logs={exercise_logs} />
        <QuickLogList quick_logs={quick_logs} />
        <LogList
          profile={profile}
          logs={logs}
          foods={foods}
          quick_logs={quick_logs}
          exercise_logs={exercise_logs}
        />
      </Body>

      <BottomBar height={footerHeight}>
        <BottomBarButtons profile={profile} />
      </BottomBar>

      <Modals profile={profile} foods={foods} recipes={recipes} logs={logs} />
    </div>
  )
}
