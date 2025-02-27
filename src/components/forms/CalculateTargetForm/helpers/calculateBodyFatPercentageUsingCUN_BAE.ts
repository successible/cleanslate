import type { Sex } from '../../../../store/navbar/types'
import { calculateBMI } from './calculateBMI'

export const calculateBodyFatPercentageUsingCUN_BAE = (
  weightInLbs: number,
  heightInInches: number,
  sexString: Sex,
  age: number
) => {
  const BMI = calculateBMI(weightInLbs, heightInInches)
  // CUN-BAE formula: https://pubmed.ncbi.nlm.nih.gov/33138089/
  // You can check the output here: https://www.onlinetrainer.es/CUN-BAE.php
  // You do not need to convert the weight and height to the metric system
  // That is because
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
    0.00021 * BMI ** 2 * age
  return BF
}
