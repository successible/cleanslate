import { round } from '../../../../helpers/round'
import rowingMET from '../data/MET/rowingMET.json'

export const getRowingMET = (watts: number) => {
  // Formula: y = 0.048x + 1.6, r = 0.985
  const MET: Record<string, number> = rowingMET
  const exactMET = MET[String(watts)]
  // If we have an exact MET match for watts, use that.
  // Otherwise, return the predicated MET
  return exactMET || round(0.048 * watts + 1.6, 2)
}
