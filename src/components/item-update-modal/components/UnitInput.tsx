import type { Unit } from '../../../constants/units'
import type { CommonItem } from '../../item/types'
import { renderUnitComponent } from '../../list/helpers/renderUnitComponent'
import { updateUnit } from '../helpers/updateUnit'

type props = {
  item: CommonItem
  localUnit: Unit
  localAmount: string
  setLocalAmount: (amount: string) => void
  setLocalUnit: (unit: Unit) => void
  convertBetweenUnits: boolean
}
export const UnitInput: React.FC<props> = ({
  convertBetweenUnits,
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
    (_id: string, unit: Unit) => {
      const { newAmount, newUnit } = updateUnit(
        item,
        localAmount,
        localUnit,
        unit,
        convertBetweenUnits
      )
      setLocalAmount(newAmount)
      setLocalUnit(newUnit)
    }
  )
}
