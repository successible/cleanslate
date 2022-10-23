import { css } from '@emotion/react'
import { subscribeToUser } from '../../helpers/authentication/subscribeToUser'
import { handlePWAPrompt } from '../../helpers/data/handlePWAPrompt'
import { handleShortcuts } from '../../helpers/data/handleShortcuts'
import { handleStartTime } from '../../helpers/data/handleStartTime'
import { handleSubscription } from '../../helpers/data/handleSubscription'
import { executeKeyboardShortcuts } from '../../helpers/ui/executeShortcuts'
import { handleBasicFoods } from '../../models/Food/helpers/handleBasicFoods'
import { subscribeToBasicFoods } from '../../models/Food/helpers/subscribeToBasicFoods'
import { subscribeToProfile } from '../../models/Profile/helpers/subscribeToProfile'
import { getData } from '../../store/getData'
import { Body } from '../body/Body'
import { BottomBarButtons } from '../bottom-bar-buttons/BottomBarButtons'
import { BottomBar } from '../bottom-bar/BottomBar'
import { LogList } from '../list/Log/LogList'
import { UnitList } from '../list/Unit/UnitList'
import Modals from '../modals/Modals'
import { Numbers } from '../numbers/Numbers'
import { TopBar } from '../top-bar/TopBar'

export const App = () => {
  const { dispatch, foods, logs, offline, profile, recipes } = getData()
  const user = subscribeToUser()

  handleStartTime(profile)
  handleShortcuts(executeKeyboardShortcuts)
  handleSubscription(
    [subscribeToProfile, subscribeToBasicFoods],
    user,
    offline,
    profile
  )
  handleBasicFoods(user)
  handlePWAPrompt(dispatch)

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
