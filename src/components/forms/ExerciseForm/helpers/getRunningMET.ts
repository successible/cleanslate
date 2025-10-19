import { round } from '../../../../helpers/round'
import runningMETs from '../data/MET/runningMET.json'

export const getRunningMET = (mph: number) => {
  // Formula: y = 1.6094x + 0.3157, r = 0.99
  const MET: Record<string, number> = runningMETs
  const exactMET = MET[String(mph)]
  // If we have an exact MET match for MPH, use that.
  // Otherwise, return the predicated MET
  return exactMET || round(1.6094 * mph + 0.3157, 2)
}
