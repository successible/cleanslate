import dayjs from 'dayjs'
import { Profile } from '../../models/Profile/model'
import { round } from '../utility/round'

/** Give the time now, represented as an ISO string, return the ISO strings representing 12:00 AM to 12:00 PM in local time
 * Designed to be used in the variables part of the GraphQL query FETCH_DATA */
export const createDateRange = (profile?: Profile) => {
  if (!profile) {
    const midnight = dayjs().startOf('day')
    return {
      today: midnight,
      tomorrow: midnight.add(24, 'hour'),
    }
  } else {
    const { startTime } = profile
    const time = startTime.split(':').slice(0, 2)
    const startHour = Number(time[0])
    const startMinute = Number(time[1])

    const startDate = dayjs()
      .startOf('day')
      .add(startHour, 'hour')
      .add(startMinute, 'minute')

    const nowHour = dayjs().hour()
    const nowMinute = dayjs().minute()
    const nowInHours = nowHour + round(nowMinute / 60, 2)
    const startTimeInHours = startHour + startMinute / 60

    const adjustedStartDate = startDate.subtract(
      nowInHours > startTimeInHours ? 0 : 24,
      'hours'
    )

    return {
      today: adjustedStartDate,
      tomorrow: adjustedStartDate.add(24, 'hour'),
    }
  }
}
