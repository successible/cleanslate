import { round } from '../../../../helpers/round'

export const calculateCaloriesFromMETs = (
  weight: number,
  minutes: number,
  MET: number
) => {
  return round((MET * 3.5 * (weight / 2.2) * minutes) / 200, 0)
}
