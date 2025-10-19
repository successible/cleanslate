import { round } from '../../../../helpers/round'
import cyclingMETs from '../data/MET/cyclingMET.json'

export const getCyclingMET = (mph: number) => {
  // Formula: y= 1.1012x - -6.3582 R = 0.989
  const MET: Record<number, number> = Object.fromEntries(
    Object.entries(cyclingMETs).map(([k, v]) => [Number(k), v])
  )
  const exactMET = MET[mph]
  // If we have an exact MET match for MPH, use that.
  // Otherwise, return the predicated MET
  return exactMET || round(1.1012 * mph - 6.3582, 2)
}
