import type { Sex } from '../../../../store/navbar/types'
import { calculateBMI } from './calculateBMI'

export const calculateBodyFatPercentageUsingCUN_BAE = (
  weight: number,
  height: number,
  sexString: Sex,
  age: number
) => {
  const BMI = calculateBMI(weight, height)
  // CUN-BAE formula: https://pubmed.ncbi.nlm.nih.gov/33138089/
  const sex = sexString === 'female' ? 1 : sexString === 'other' ? 0.5 : 0
  const BF =
    -44.988 +
    0.503 * age +
    10.689 * sex +
    3.172 * BMI -
    0.026 * BMI ** 2 +
    0.181 * BMI * sex -
    0.02 * BMI * age -
    0.005 * BMI ** 2 * sex +
    0.00021 * BMI ** 2
  return BF
}
