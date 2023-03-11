import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import Cookies from 'js-cookie'
import ms from 'ms'
import React from 'react'
import { profileKey } from '../helpers/constants'
import { getDomain } from '../helpers/getDomain'

dayjs.extend(isToday)

const setLastReset = () => {
  Cookies.set('last-reset', dayjs().toString(), {
    domain: getDomain(),
    expires: 5,
  })
}

export const useStartTime = () => {
  React.useEffect(() => {
    const handler = () => {
      const lastReset = Cookies.get('last-reset')

      if (lastReset === undefined) {
        return setLastReset()
      }

      if (!dayjs(lastReset).isToday()) {
        setLastReset()
        localStorage.setItem(profileKey, 'null')
        window.location.reload()
      }
    }

    const interval = setInterval(handler, ms('1 second'))
    return () => clearInterval(interval)
  }, [])
}
