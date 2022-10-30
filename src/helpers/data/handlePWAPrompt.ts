import React from 'react'
import { Profile } from '../../models/Profile/model'
import { AllEvents } from '../../store/store'
import { Dispatch } from '../../store/types'
import { isMobile } from '../ui/isMobile'
import { isProduction } from '../ui/isProduction'
import { isPWA } from '../ui/isPWA'

export const handlePWAPrompt = (
  profile: Profile,
  dispatch: Dispatch<AllEvents>
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    setTimeout(() => {
      if (
        isMobile() &&
        !isPWA() &&
        isProduction() &&
        profile.hidePWAPrompt !== true
      ) {
        dispatch('openPWAPrompt')
      }
    }, 30000)
  }, [dispatch, profile.hidePWAPrompt])
}
