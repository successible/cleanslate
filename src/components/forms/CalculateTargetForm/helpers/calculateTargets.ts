import type { Sex } from '../../../../store/navbar/types'
import type { Goal } from '../CalculateTargetForm'
import { calculateBMRUsingKatchMcardle } from './calculateBMRUsingKatchMcardle'
import { calculateBodyFatPercentageUsingCUN_BAE } from './calculateBodyFatPercentageUsingCUN_BAE'
import { calculateIdealBodyWeightInKg } from './calculateIdealBodyWeightInKg'

export const calculateTargets = (
  metric: boolean,
  age: string,
  sex: Sex,
  weight: string,
  feet: string,
  inches: string,
  liftWeights: boolean,
  goal: Goal
) => {
  // When metric is true, weight is kg, feet is actually cm, and inches is none
  // When metric is false, inches and feet are inches and feet, and weight is lbs
  const ageToUse = Number(age)
  const weightToUse = metric ? Number(weight) * 2.2046226218 : Number(weight)
  const heightToUse = metric
    ? 0.3937 * Number(feet)
    : Number(feet) * 12 + Number(inches)

  const idealBodyWeightInKg = calculateIdealBodyWeightInKg(sex, heightToUse)

  const estimatedBodyFatPercentage =
    calculateBodyFatPercentageUsingCUN_BAE(
      weightToUse,
      heightToUse,
      sex,
      ageToUse
    ) / 100

  const leanBodyMassInKg =
    (weightToUse * (1 - estimatedBodyFatPercentage)) / 2.2

  const basalMetabolicRate = calculateBMRUsingKatchMcardle(
    weightToUse,
    estimatedBodyFatPercentage
  )

  // Assume a 10% thermic effect of food
  // https://examine.com/outcomes/thermic-effect-of-food/
  const thermicEffectOfFood = 0.1

  // Assume a 1.1 multiplier for PA:  https://legionathletics.com/tdee-calculator/
  const physicalActivityModifier = 0.1

  const totalDailyEnergyExpenditure =
    basalMetabolicRate * (1 + physicalActivityModifier + thermicEffectOfFood)

  // Calculate protein targets

  const SURPLUS = 1.1
  const DEFICIT = 0.75
  const MAINTAIN = 1

  const getCalorieTarget = (goal: Goal) => {
    if (goal === 'maintain') {
      return totalDailyEnergyExpenditure * MAINTAIN
    }
    if (goal === 'muscle') {
      return totalDailyEnergyExpenditure * SURPLUS
    }
    return Math.round(totalDailyEnergyExpenditure * DEFICIT)
  }

  return {
    calorieTarget: Math.round(getCalorieTarget(goal)),
    proteinTarget:
      liftWeights === true
        ? // Using the 1.6/2.2 g/kg rule
          // https://bjsm.bmj.com/content/52/6/376.full?fbclid=IwAR2Hn-sPcLthyGUr6x3bJHJ4CA7h7wHEB83GhKmstCtYSG_yIh100tJUHQp3s
          Math.round(1.6 * leanBodyMassInKg)
        : // Using the Cleveland Clinic PSMF rule
          // https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4784653
          Math.round(1.2 * idealBodyWeightInKg),
  }
}
