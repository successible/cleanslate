import dayjs from 'dayjs'
import Cookies from 'js-cookie'
import ms from 'ms'
import React from 'react'
import { spawnAlert } from '../../components/alert/helpers/spawnAlert'
import { Profile } from '../../models/Profile/model'

export const handleStartTime = (profile: Profile) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    const handler = () => {
      const justReset = Cookies.get('just-reset')
      const startTime = profile.startTime.split(':').slice(0, 2)
      const startHour = Number(startTime[0])
      const startMinute = Number(startTime[1])
      const now = dayjs()
      const shouldReset =
        now.hour() === startHour &&
        startMinute === now.minute() &&
        justReset === undefined
      if (shouldReset) {
        // This cookie prevents running window.reload() multiple times on the start time
        // For example, this loop runs every ten seconds. Hence, it will run 6 times on 12:00 AM, the default start time
        Cookies.set('just-reset', 'yes', {
          expires: now.add(5, 'minutes').toDate(),
        })
        spawnAlert('Your day has reset!', 'success')
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      }
    }
    const interval = setInterval(handler, ms('5 seconds'))
    return () => clearInterval(interval)
  }, [profile.startTime])
}
