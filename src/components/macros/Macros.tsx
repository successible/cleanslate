import type React from 'react'
import type { Log } from '../../models/log'
import type { Profile } from '../../models/profile'
import { MacroDisplay } from './MacroDisplay'
import { calculateFoodOrRecipeDensities } from './helpers/calculateDensities'
import { calculateMacros } from './helpers/calculateMacros'

type props = {
  log: Log
  profile: Profile
  showTitles: boolean
}

export const Macros: React.FC<props> = ({ log, profile, showTitles }) => {
  const [
    caloriesConsumedFromLogs,
    caloriesConsumedFromQuickLogs,
    caloriesBurnedFromExercise,
    proteinConsumed,
  ] = calculateMacros([log], [], []).map((v) => Math.round(v))

  const caloriesConsumed =
    caloriesConsumedFromLogs +
    caloriesConsumedFromQuickLogs -
    caloriesBurnedFromExercise

  const recipe = log.logToRecipe
  const food = log.logToFood

  const densities = calculateFoodOrRecipeDensities(
    log.amount,
    log.barcode || food || recipe,
    caloriesConsumed,
    proteinConsumed
  )

  let caloricDensity: number | null = null
  let proteinDensity: number | null = null
  let combinedDensity: number | null = null

  if (densities) {
    caloricDensity = densities[0]
    proteinDensity = densities[1]
    combinedDensity = densities[2]

    if (Number.isNaN(caloricDensity)) {
      caloricDensity = 0
    }
    if (Number.isNaN(proteinDensity)) {
      proteinDensity = 0
    }
    if (Number.isNaN(combinedDensity)) {
      combinedDensity = 0
    }
  }

  if (caloriesConsumed >= 0) {
    return (
      <MacroDisplay
        showTitles={showTitles}
        calories={caloriesConsumed}
        protein={proteinConsumed}
        densities={[
          caloricDensity || 0,
          proteinDensity || 0,
          combinedDensity || 0,
        ]}
        profile={profile}
      />
    )
  }
  return <div />
}
