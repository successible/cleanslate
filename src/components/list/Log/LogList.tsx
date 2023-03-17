import { css } from '@emotion/react'
import groupBy from 'lodash.groupby'
import React from 'react'
import { quickAddUnits } from '../../../constants/units'
import { Unit } from '../../../constants/units'
import { profileIsLoaded } from '../../../helpers/profileIsLoaded'
import { Food } from '../../../models/food'
import { Log, Meal, MealEnum } from '../../../models/log'
import { Profile } from '../../../models/profile'
import { colors } from '../../../theme'
import { Spinner } from '../../spinner/Spinner'
import { sortByCreatedAt } from './helpers/sortByCreatedAt'
import { LogItem } from './LogItem'
import { Shell } from './Shell'

type props = {
  logs: Log[]
  foods: Food[]
  profile: Profile
}

export const LogList: React.FC<props> = (props) => {
  const { logs, profile } = props
  const units: Unit[] = quickAddUnits

  const logsToUse = sortByCreatedAt(
    [...logs].filter((log) => !units.includes(log.unit))
  ) as Log[]

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
    } else {
      return colors.yellow
    }
  }

  return (
    <div
      css={css`
        margin: 0 auto;
        width: 90%;
      `}
    >
      {logs.length > 0 ? (
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
                      text-decoration: ${consumptionByGroup[meal]
                        ? 'line-through'
                        : undefined};
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
      ) : // Only show the shell if the user is logged in but hasn't added any logs for the day
      profileIsLoaded(profile) ? (
        <Shell profile={profile} />
      ) : (
        <div className="w100 h100">
          <Spinner />
        </div>
      )}
    </div>
  )
}
