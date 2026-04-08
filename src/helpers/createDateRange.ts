import dayjs from 'dayjs'
import type { Profile } from '../models/profile'

type DateRange = 'yesterday' | 'today'

export const createDateRange = (profile: Profile) => {
  const now = dayjs()
  const midnight = dayjs().startOf('day')
  const [hour, minute, second] = profile.startTime.split(':').map(Number)
  const today = midnight
    .set('hour', hour)
    .set('minute', minute)
    .set('second', second)

  return {
    mode: (today > now ? 'yesterday' : 'today') as DateRange,
    now,
    midnight,
    today,
    ranges: {
      today: {
        start: today,
        end: today.add(24, 'hour'),
      },
      yesterday: {
        start: today.subtract(24, 'hour'),
        end: today,
      },
    },
  }
}
