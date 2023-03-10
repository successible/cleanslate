import React from 'react'
import { isMobile } from '../helpers/isMobile'
import { isProduction } from '../helpers/isProduction'
import { isPWA } from '../helpers/isPWA'
import { Profile } from '../models/profile'
import { AllEvents } from '../store/store'
import { Dispatch } from '../store/types'

export const usePWAPrompt = (
  profile: Profile,
  dispatch: Dispatch<AllEvents>
) => {
  React.useEffect(() => {
    const showPrompt =
      isMobile() && !isPWA() && isProduction() && profile.hidePWAPrompt !== true

    setTimeout(() => {
      if (showPrompt) {
        dispatch('openPWAPrompt')
      }
    }, 5000)
  }, [dispatch, profile.hidePWAPrompt])
}
