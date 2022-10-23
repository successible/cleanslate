import { Sex } from '../../../../store/navbar/types'

/** Calculate BMR using the Mifflin St. Jeor equation */
export const calculateBMRUsingStJeor = (
  age: number,
  sex: Sex,
  height: number,
  weight: number
) => {
  const weightInKg = 0.453 * weight
  const heightInCm = 2.54 * height

  const maleBMR = 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5
  const femaleBMR = 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161

  if (sex === 'male') {
    return maleBMR
  } else if (sex === 'female') {
    return femaleBMR
  } else {
    return (femaleBMR + maleBMR) / 2
  }
}

export const calculateBMRUsingKatchMcardle = (
  weight: number,
  bodyfatPercentage: number
) => {
  // Only use estimatedBodyFat (from BMI) if body fat is not provided
  return 370 + 21.6 * (weight / 2.20462) * (1 - bodyfatPercentage)
}
