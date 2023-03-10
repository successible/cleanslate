export const calculateBMRUsingKatchMcardle = (
  weight: number,
  bodyfatPercentage: number
) => {
  // Only use estimatedBodyFat (from BMI) if body fat is not provided
  return 370 + 21.6 * (weight / 2.20462) * (1 - bodyfatPercentage)
}
