import { round } from '../../../../helpers/round'
import rowingMET from '../data/rowingMET.json'

export const getRowingMET = (watts: number) => {
  // Formula: y = 0.054x + 1, r = 0.989
  const MET: Record<string, number> = rowingMET
  const exactMET = MET[String(watts)]
  // If we have an exact MET match for watts, use that.
  // Otherwise, return the predicated MET
  return exactMET || round(0.054 * watts + 1, 2)
}
