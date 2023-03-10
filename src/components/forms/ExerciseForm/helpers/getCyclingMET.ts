import { round } from '../../../../helpers/round'

export const getCyclingMET = (mph: number) => {
  // Formula: y= 0.8425x - 2.243, R = 0.976
  return round(0.8425 * mph - 2.243, 2)
}
