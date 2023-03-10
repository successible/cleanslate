import { Sex } from '../../../../store/navbar/types'

/** Calculate ideal body weight, based on the Robinson formula.
 * The results are in kg but height is in inches.
 * */
export const calculateIdealBodyWeightInKg = (sex: Sex, height: number) => {
  const male = 52 + 1.9 * (height - 60)
  const female = 49 + 1.7 * (height - 60)
  const other = (male + female) / 2
  if (sex === 'male') {
    return male
  } else if (sex === 'female') {
    return female
  } else {
    return other
  }
}
