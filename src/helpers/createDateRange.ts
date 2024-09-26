import dayjs from 'dayjs'
import type { Profile } from '../models/profile'

export const createDateRange = (profile: Profile) => {
  const midnight = profile.timeToExecuteFrameChange
    ? dayjs().startOf('day').subtract(1, 'day')
    : dayjs().startOf('day')

  const [hour, minute, second] = profile.startTime.split(':').map(Number)
  const today = midnight
    .set('hour', hour)
    .set('minute', minute)
    .set('second', second)

  const tomorrow = today.add(24, 'hour')
  return {
    today,
    tomorrow,
  }
}
