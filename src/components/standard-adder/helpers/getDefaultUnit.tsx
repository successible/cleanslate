import type { Unit } from '../../../constants/units'

export const getDefaultUnit = (units: Record<Unit, string>[]) => {
  return Object.keys(
    units.reduce((acc, unitSet) => {
      // biome-ignore lint/performance/noAccumulatingSpread: This is acceptable here
      return { ...acc, ...unitSet }
    }, {})
  )[0] as Unit
}
