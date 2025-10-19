import { round } from '../../../../helpers/round'

// Reference: https://web.archive.org/web/20220202000341/https://media.hypersites.com/clients/1235/filemanager/MHC/METs.pdf
// We do not use the less accurate formula: Calories = MET * kg * hours

export const calculateCaloriesFromMETs = (
  weightInLbs: number,
  minutes: number,
  MET: number
) => {
  return round((MET * 3.5 * (weightInLbs / 2.2046226218) * minutes) / 200, 0)
}
