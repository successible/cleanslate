import { LBS_TO_KG } from './calculateTargets'

export const calculateBMRUsingKatchMcardle = (
  weightInLbs: number,
  bodyfatPercentage: number
) => {
  const weightInKg = weightInLbs / LBS_TO_KG
  return 370 + 21.6 * weightInKg * (1 - bodyfatPercentage)
}
