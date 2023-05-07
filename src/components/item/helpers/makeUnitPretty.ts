import { defaultContainer, defaultCount, Unit } from '../../../constants/units'
import { CommonItem } from '../types'

export const makeUnitPretty = (item: CommonItem, unit: Unit | null) => {
  if (unit === 'CALORIE') {
    return 'calories'
  } else if (unit === 'EXERCISE') {
    return 'calories burned'
  } else if (unit === 'COUNT') {
    return (
      item.food?.countName ||
      item.childRecipe?.countName ||
      item.recipe?.countName ||
      defaultCount
    )
  } else if (unit === 'CONTAINER') {
    return (
      item.food?.containerName ||
      item.childRecipe?.containerName ||
      item.recipe?.containerName ||
      defaultContainer
    )
  } else if (unit === 'mL') {
    return unit
  } else {
    return unit?.toLowerCase()
  }
}
