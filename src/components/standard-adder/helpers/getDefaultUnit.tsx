import type { Unit } from '../../../constants/units'

export const getDefaultUnit = (units: Record<Unit, string>[]) => {
  return Object.keys(
    units.reduce((acc, unitSet) => {
      return { ...acc, ...unitSet }
    }, {})
  )[0] as Unit
}
