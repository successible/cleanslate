import { defaultContainer, defaultCount, Unit } from '../../../constants/units'
import { CommonItem } from '../types'

export const getPrettyCount = (item: CommonItem) => {
  if (item.food) {
    return item.food.countName || defaultCount
  } else if (item.childRecipe || item.recipe) {
    const spc =
      item.childRecipe?.servingPerContainer || item.recipe?.servingPerContainer
    if (spc && spc !== 0) {
      return defaultCount
    } else {
      return (
        item.childRecipe?.countName || item.recipe?.countName || defaultCount
      )
    }
  }
  return defaultCount
}

export const getPrettyContainer = (item: CommonItem) => {
  if (item.food) {
    return item.food.containerName || defaultContainer
  } else if (item.childRecipe || item.recipe) {
    const spc =
      item.childRecipe?.servingPerContainer || item.recipe?.servingPerContainer
    if (spc && spc !== 0) {
      return (
        item.childRecipe?.countName ||
        item.recipe?.countName ||
        defaultContainer
      )
    } else {
      return defaultContainer
    }
  }
  return defaultContainer
}

export const makeUnitPretty = (item: CommonItem, unit: Unit | null) => {
  if (unit === 'COUNT') {
    return getPrettyCount(item)
  } else if (unit === 'CONTAINER') {
    return getPrettyContainer(item)
  } else if (unit === 'mL') {
    return unit
  } else {
    return unit?.toLowerCase()
  }
}
