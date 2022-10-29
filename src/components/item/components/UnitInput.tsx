import { Unit } from '../../../models/Log/types'
import { makeUnitPretty } from '../helpers/makeUnitPretty'
import { CommonItem } from '../types'

type props = {
  item: CommonItem
  unit: Unit | null
}
export const UnitInput: React.FC<props> = ({ item, unit }) => (
  <div>{makeUnitPretty(item, unit)}</div>
)
