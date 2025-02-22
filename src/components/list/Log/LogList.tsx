import { css } from '@emotion/react'
import { groupBy } from 'lodash-es'
import type React from 'react'
import { profileIsLoaded } from '../../../helpers/profileIsLoaded'
import type { ExerciseLog } from '../../../models/exerciseLog'
import type { Food } from '../../../models/food'
import { type Log, type Meal, MealEnum } from '../../../models/log'
import type { Profile } from '../../../models/profile'
import type { QuickLog } from '../../../models/quickLog'
import { colors } from '../../../theme'
import { Spinner } from '../../spinner/Spinner'
import { LogItem } from './LogItem'
import { Shell } from './Shell'
import { sortByCreatedAt } from './helpers/sortByCreatedAt'

type props = {
  logs: Log[]
  foods: Food[]
  profile: Profile
  quick_logs: QuickLog[]
  exercise_logs: ExerciseLog[]
}

export const LogList: React.FC<props> = (props) => {
  const { exercise_logs, logs, profile, quick_logs } = props

  const logsToUse = sortByCreatedAt(logs) as Log[]

  const groupedLogs = groupBy(logsToUse, 'meal')
  const consumptionByGroup: Record<Meal, boolean> = {
    Breakfast: true,
    Dinner: true,
    Lunch: true,
    Snack: true,
  }

  Object.keys(groupedLogs).map((m) => {
    const meal = m as Meal
    const status = groupedLogs[meal].reduce((acc, log) => {
      if (log.consumed) {
        acc = true
      } else {
        acc = false
      }
      return acc
    }, true)

    consumptionByGroup[meal] = status
  })

  const mapMealToColor = (meal: Meal) => {
    if (meal === 'Breakfast') {
      return colors.pink
    }
    if (meal === 'Lunch') {
      return colors.green
    }
    if (meal === 'Dinner') {
      return colors.blue
    }
    return colors.yellow
  }

  return (
    <div
      css={css`
        margin: 0 auto;
        width: 90%;
      `}
    >
      {logs.length > 0 || quick_logs.length > 0 || exercise_logs.length > 0 ? (
        Object.keys(groupedLogs)
          .sort((a, b) => {
            const mealA = a as Meal
            const mealB = b as Meal
            return MealEnum[mealA] - MealEnum[mealB]
          })
          .map((m, i) => {
            const meal = m as Meal
            const logsByMeal = groupedLogs[meal]
            return (
              <div key={meal}>
                {profile.enablePlanning && (
                  <div
                    css={css`
                      margin-top: ${i === 0 ? 20 : 0}px;
                      background-color: ${mapMealToColor(meal)};
                      text-decoration: ${
                        consumptionByGroup[meal] ? 'line-through' : undefined
                      };
                      opacity: ${consumptionByGroup[meal] ? 0.5 : 1};
                      display: inline-block;
                      padding: 5px 7.5px;
                      border-radius: 5px;
                      font-size: 0.9rem;
                    `}
                  >
                    {meal}
                  </div>
                )}
                {logsByMeal.map((log: Log) => (
                  <LogItem
                    key={log.id}
                    log={log}
                    profile={profile}
                    renderUnit={true}
                  />
                ))}
              </div>
            )
          })
      ) : profileIsLoaded(profile) ? (
        <Shell profile={profile} />
      ) : (
        <div className="w100 h100">
          <Spinner />
        </div>
      )}
    </div>
  )
}
