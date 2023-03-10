import { Unit } from '../../../constants/units'
import { capitalize } from '../../../helpers/capitalize'

/** Capitalize the passed in unit and possibly pluralize it */
export const formatUnitAsTitle = (unit: Unit) => {
  if (unit === 'CALORIE') {
    return capitalize(unit + 'S')
  } else {
    return capitalize(unit)
  }
}
