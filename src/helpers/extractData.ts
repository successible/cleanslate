import dayjs from 'dayjs'

import { store } from '../store/store'
import { createDateRange } from './createDateRange'

export const extractData = (data = store.get().data) => {
  const { basicFoods, profiles } = data
  const profile = profiles[0]
  const { exercise_logs, logs, quick_logs, recipes } = profile
  const customFoods = profile.foods
  const foods = [...basicFoods, ...customFoods]

  const { mode, ranges } = createDateRange(profile)

  return {
    // Static: The day it was made does not matter
    foods,
    profile,
    recipes,
    // Dynamic: The day it was made matters
    // If we have any type of log from yesterday and it is today, we want to filter it out
    // So that when the day changes, it does not take two to five seconds for the GraphQL query
    // To come back and update the data stored in localStorage
    exercise_logs: exercise_logs.filter(
      (l) => !(mode === 'today' && dayjs(l.createdAt) < ranges.yesterday.end)
    ),
    logs: logs.filter(
      (l) => !(mode === 'today' && dayjs(l.createdAt) < ranges.yesterday.end)
    ),
    quick_logs: quick_logs.filter(
      (l) => !(mode === 'today' && dayjs(l.createdAt) < ranges.yesterday.end)
    ),
  }
}
