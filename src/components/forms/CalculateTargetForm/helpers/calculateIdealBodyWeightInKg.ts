import type { Sex } from '../../../../store/navbar/types'

// Reference: https://www.calculator.net/ideal-weight-calculator.html
// We use the Robinson formula, but other formulas to calculate IBW are valid
// https://www.semanticscholar.org/paper/Comparison-of-ideal-body-weight-equations-and-with-Shah-Sucher/ff426cf597d8ac2b95af90468f4ff929e57d6dc2
// https://pmc.ncbi.nlm.nih.gov/articles/PMC8646317/

/** Calculate ideal body weight, based on the Robinson formula.
 * The results are in kg but height is in inches.
 * We modified it to handle non-binary individuals to the best of our ability
 * */
export const calculateIdealBodyWeightInKg = (
  sex: Sex,
  heightInInches: number
) => {
  const male = 52 + 1.9 * (heightInInches - 60)
  const female = 49 + 1.7 * (heightInInches - 60)
  const other = (male + female) / 2
  if (sex === 'male') {
    return male
  }
  if (sex === 'female') {
    return female
  }
  return other
}
