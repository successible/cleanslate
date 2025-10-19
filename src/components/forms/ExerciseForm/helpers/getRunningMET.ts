import { round } from '../../../../helpers/round'
import runningMETs from '../data/MET/runningMET.json'

export const getRunningMET = (mph: number) => {
  // Formula: y = 1.6094x + 0.3157, r = 0.99
  const MET: Record<number, number> = Object.fromEntries(
    Object.entries(runningMETs).map(([k, v]) => [Number(k), v])
  )
  const exactMET = MET[mph]
  // If we have an exact MET match for MPH, use that.
  // Otherwise, return the predicated MET
  return exactMET || round(1.6094 * mph + 0.3157, 2)
}
