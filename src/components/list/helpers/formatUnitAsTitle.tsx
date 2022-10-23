import { capitalize } from '../../../helpers/utility/capitalize'
import { Unit } from '../../../models/Log/types'

/** Capitalize the passed in unit and possibly pluralize it */
export const formatUnitAsTitle = (unit: Unit) => {
  if (unit === 'CALORIE') {
    return capitalize(unit + 'S')
  } else {
    return capitalize(unit)
  }
}
