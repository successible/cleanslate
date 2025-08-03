import {
  defaultContainer,
  defaultCount,
  type Unit,
} from '../../../constants/units'
import type { CommonItem } from '../types'

export const getPrettyCount = (item: CommonItem) => {
  if (item.barcode) {
    return defaultCount
  }
  if (item.food) {
    return item.food.countName || defaultCount
  }
  if (item.childRecipe || item.recipe) {
    const spc =
      item.childRecipe?.servingPerContainer || item.recipe?.servingPerContainer
    if (spc && spc !== 0) {
      return defaultCount
    }
    return item.childRecipe?.countName || item.recipe?.countName || defaultCount
  }
  return defaultCount
}

export const getPrettyContainer = (item: CommonItem) => {
  if (item.food) {
    return item.food.containerName || defaultContainer
  }
  if (item.childRecipe || item.recipe) {
    const spc =
      item.childRecipe?.servingPerContainer || item.recipe?.servingPerContainer
    if (spc && spc !== 0) {
      return (
        item.childRecipe?.countName ||
        item.recipe?.countName ||
        defaultContainer
      )
    }
    return defaultContainer
  }
  return defaultContainer
}

export const makeUnitPretty = (item: CommonItem, unit: Unit | null) => {
  if (unit === 'COUNT') {
    return getPrettyCount(item)
  }
  if (unit === 'CONTAINER') {
    return getPrettyContainer(item)
  }
  if (unit === 'mL') {
    return unit
  }
  return unit?.toLowerCase()
}
