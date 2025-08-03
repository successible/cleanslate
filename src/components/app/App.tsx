import { gql, useSubscription } from '@apollo/client'
import { css } from '@emotion/react'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'
import ms from 'ms'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { SUBSCRIBE_TO_DATA } from '../../graphql/profile'
import { createDateRange } from '../../helpers/createDateRange'
import { executeKeyboardShortcuts } from '../../helpers/executeShortcuts'
import { getDomain } from '../../helpers/getDomain'
import { getLoginStatus } from '../../helpers/getLoginStatus'
import { handleData } from '../../helpers/handleData'
import { isLoadedUser } from '../../helpers/isLoadedUser'
import { updateProfileOnCloud } from '../../helpers/profile/updateProfileOnCloud'
import { stringifyQuery } from '../../helpers/stringifyQuery'
import { useData } from '../../hooks/useData'
import { useLogoutOtherTab } from '../../hooks/useLogoutOtherTab'
import { usePWAPrompt } from '../../hooks/usePWAPrompt'
import { useShortcuts } from '../../hooks/useShortcuts'
import { useUser } from '../../hooks/useUser'
import type { Data } from '../../store/data/types'
import { Body } from '../body/Body'
import { BottomBar } from '../bottom-bar/BottomBar'
import { BottomBarButtons } from '../bottom-bar-buttons/BottomBarButtons'
import { ExerciseLogList } from '../list/ExerciseLogList/ExerciseLogList'
import { LogList } from '../list/Log/LogList'
import { QuickLogList } from '../list/QuickLog/QuickLogList'
import Modals from '../modals/Modals'
import { Numbers } from '../numbers/Numbers'
import { TopBar } from '../top-bar/TopBar'

export const App = () => {
  const { dispatch, exercise_logs, foods, logs, profile, quick_logs, recipes } =
    useData()

  const user = useUser()
  // @ts-ignore: Type instantiation is excessively deep and possibly infinite.
  const { data, loading } = useSubscription<Data>(
    gql(stringifyQuery(SUBSCRIBE_TO_DATA)),
    { variables: createDateRange(profile) }
  )

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
      if (dayjs(profile.timeToExecuteFrameChange).unix() < dayjs().unix())
        [
          updateProfileOnCloud(
            { id: profile.id, set: { timeToExecuteFrameChange: null } },
            () => {
              Cookies.remove('last-refreshed')
              window.location.reload()
            }
          ),
        ]
    }
  }, [loading, profile])

  useEffect(() => {
    const handler = () => {
      if (!loading) {
        const cookie = Cookies.get('last-refreshed')
        const hour = Number(profile.startTime.split(':')[0])
        const minute = Number(profile.startTime.split(':')[1])
        const time = dayjs()
        if (
          time.hour() === hour &&
          time.minute() === minute &&
          cookie === undefined
        ) {
          Cookies.set('last-refreshed', dayjs().toISOString(), {
            domain: getDomain(),
            expires: time.add(5, 'minutes').toDate(),
          })
          toast.success('Your day is restarting in five seconds!')
          setTimeout(() => {
            window.location.reload()
          }, 5000)
        }
      }
    }
    const interval = setInterval(handler, ms('1 second'))
    return () => clearInterval(interval)
  }, [loading, profile])
  1
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
