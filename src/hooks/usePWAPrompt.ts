import React from 'react'
import { isMobile } from '../helpers/isMobile'
import { isPWA } from '../helpers/isPWA'
import { isProduction } from '../helpers/isProduction'
import type { Profile } from '../models/profile'
import type { AllEvents } from '../store/store'
import type { Dispatch } from '../store/types'

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
