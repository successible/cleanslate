import { Sex } from '../../../../store/navbar/types'
import { Goal } from '../CalculateTargetForm'
import { calculateBMRUsingKatchMcardle } from './calculateBMRUsingKatchMcardle'
import { calculateBodyFatPercentageUsingCUN_BAE } from './calculateBodyFatPercentageUsingCUN_BAE'
import { calculateIdealBodyWeightInKg } from './calculateIdealBodyWeightInKg'

export const calculateTargets = (
  age: string,
  sex: Sex,
  weight: string,
  feet: string,
  inches: string,
  liftWeights: boolean,
  goal: Goal
) => {
  const height = Number(feet) * 12 + Number(inches)
  const idealBodyWeightInKg = calculateIdealBodyWeightInKg(sex, height)

  const estimatedBodyFatPercentage =
    calculateBodyFatPercentageUsingCUN_BAE(
      Number(weight),
      height,
      sex,
      Number(age)
    ) / 100

  const leanBodyMassInKg =
    (Number(weight) * (1 - estimatedBodyFatPercentage)) / 2.2

  const basalMetabolicRate = calculateBMRUsingKatchMcardle(
    Number(weight),
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
    } else if (goal === 'muscle') {
      return totalDailyEnergyExpenditure * SURPLUS
    } else {
      return Math.round(totalDailyEnergyExpenditure * DEFICIT)
    }
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
