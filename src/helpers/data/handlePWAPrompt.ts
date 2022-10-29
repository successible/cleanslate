import React from 'react'
import { AllEvents } from '../../store/store'
import { Dispatch } from '../../store/types'
import { isMobile } from '../ui/isMobile'
import { isProduction } from '../ui/isProduction'
import { isPWA } from '../ui/isPWA'

export const handlePWAPrompt = (dispatch: Dispatch<AllEvents>) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    setTimeout(() => {
      if (isMobile() && !isPWA() && isProduction()) {
        dispatch('openPWAPrompt')
      }
    }, 30000)
  }, [dispatch])
}
