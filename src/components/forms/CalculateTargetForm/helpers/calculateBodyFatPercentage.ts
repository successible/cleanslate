import { Sex } from '../../../../store/navbar/types'
import { calculateBMI } from './calculateBMI'

export const calculateBodyFatPercentage = (
  weight: number,
  height: number,
  sexString: Sex,
  age: number
) => {
  const BMI = calculateBMI(weight, height)
  // http://europepmc.org/article/med/2043597
  // const sex = sexString === "male" ? 1 : 0;
  // const BF = (1.2 * BMI + 0.23 * age - 10.8 * mapSexToNumber(sex) - 5.4) / 100
  // return BF

  // https://pubmed.ncbi.nlm.nih.gov/33138089/
  // https://care.diabetesjournals.org/content/35/2/383
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
