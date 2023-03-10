import { round } from '../../../../helpers/round'
import runningMETs from '../data/runningMETs.json'

export const getRunningMET = (mph: number) => {
  // Formula: y = 1.7306x - 0.7185, r = 0.99
  const MET: Record<string, number> = runningMETs
  const exactMET = MET[String(mph)]
  // If we have an exact MET match for MPH, use that.
  // Otherwise, return the predicated MET
  return exactMET || round(1.7306 * mph - 0.7185, 2)
}
