import pluralize from 'pluralize'
import { Unit } from '../../../constants/units'
import { makeUnitPretty } from '../helpers/makeUnitPretty'
import { CommonItem } from '../types'

type props = {
  item: CommonItem
  unit: Unit | null
}
export const UnitInput: React.FC<props> = ({ item, unit }) => {
  const { amount } = item
  const prettyUnit = makeUnitPretty(item, unit)

  return (
    <div>
      {Number(amount) > 1 &&
      prettyUnit &&
      unit !== 'mL' &&
      unit !== 'LBS' &&
      unit !== 'OZ' &&
      unit !== 'TBSP' &&
      unit !== 'TSP'
        ? pluralize(prettyUnit)
        : prettyUnit}
    </div>
  )
}
