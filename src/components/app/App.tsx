import { css } from '@emotion/react'
import { executeKeyboardShortcuts } from '../../helpers/executeShortcuts'
import { subscribeToProfile } from '../../helpers/profile/subscribeToProfile'
import { useData } from '../../hooks/useData'
import { usePWAPrompt } from '../../hooks/usePWAPrompt'
import { useShortcuts } from '../../hooks/useShortcuts'
import { useStartTime } from '../../hooks/useStartTime'
import { useSubscription } from '../../hooks/useSubscription'
import { useTruncateData } from '../../hooks/useTruncateData'
import { useUser } from '../../hooks/useUser'
import { Body } from '../body/Body'
import { BottomBar } from '../bottom-bar/BottomBar'
import { BottomBarButtons } from '../bottom-bar-buttons/BottomBarButtons'
import { LogList } from '../list/Log/LogList'
import { UnitList } from '../list/Unit/UnitList'
import Modals from '../modals/Modals'
import { Numbers } from '../numbers/Numbers'
import { TopBar } from '../top-bar/TopBar'

export const App = () => {
  const { dispatch, foods, logs, offline, profile, recipes } = useData()
  const user = useUser()

  useTruncateData()
  useStartTime()
  useShortcuts(executeKeyboardShortcuts)
  useSubscription([subscribeToProfile], user, offline, profile)
  usePWAPrompt(profile, dispatch)

  const navbarHeight = 65
  const footerHeight = 65

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
        <Numbers profile={profile} logs={logs} />
      </TopBar>

      <Body navbar={navbarHeight} footer={footerHeight} profile={profile}>
        <UnitList logs={logs} />
        <LogList profile={profile} logs={logs} foods={foods} />
      </Body>

      <BottomBar height={footerHeight}>
        <BottomBarButtons profile={profile} />
      </BottomBar>

      <Modals profile={profile} foods={foods} recipes={recipes} logs={logs} />
    </div>
  )
}
