import { Unit } from '../../../constants/units'
import { CommonItem } from '../../item/types'
import { renderUnitComponent } from '../../list/helpers/renderUnitComponent'
import { updateUnit } from '../helpers/updateUnit'

type props = {
  item: CommonItem
  localUnit: Unit
  localAmount: string
  setLocalAmount: (amount: string) => void
  setLocalUnit: (unit: Unit) => void
}
export const UnitInput: React.FC<props> = ({
  item,
  localAmount,
  localUnit,
  setLocalAmount,
  setLocalUnit,
}) => {
  const { childRecipe, food, id, recipe } = item
  return renderUnitComponent(
    id,
    localUnit,
    food || recipe || childRecipe,
    (id: string, unit: Unit) => {
      const { newAmount, newUnit } = updateUnit(
        item,
        localAmount,
        localUnit,
        unit
      )
      setLocalAmount(newAmount)
      setLocalUnit(newUnit)
    }
  )
}
