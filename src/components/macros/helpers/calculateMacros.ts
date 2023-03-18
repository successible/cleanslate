import { volumeUnits } from '../../../constants/units'
import { QuickAddUnit, Unit } from '../../../constants/units'
import { handleError } from '../../../helpers/handleError'
import { Food } from '../../../models/food'
import { Log } from '../../../models/log'
import { Recipe } from '../../../models/recipe'
import { convertFromWeightToGrams } from './convertFromWeightToGrams'
import { mapOtherVolumeUnitToTbsp } from './mapOtherVolumeUnitToTbsp'

// These three functions calculate the perTbsp number for the countToGram and tbspToGram
export const calculateProteinPerTbsp = (food: Food) => {
  if (food.tbspToGram && food.proteinPerGram) {
    return food.proteinPerGram * food.tbspToGram
  } else {
    return null
  }
}

export const calculateCaloriesPerTbsp = (food: Food) => {
  if (food.tbspToGram && food.caloriesPerGram) {
    return food.caloriesPerGram * food.tbspToGram
  } else {
    return null
  }
}

/** This function calculates the calories/protein in a single food, given a log */
const calculatePerFood = (
  food: Food,
  amount: number,
  unit: Unit,
  perGram: number | null,
  perTbsp: number | null,
  countToGram: number | null,
  perCount: number | null,
  countToTbsp: number | null,
  servingPerContainer: number | null
) => {
  // Purely for error logging purposes
  const data = {
    amount,
    countToGram,
    countToTbsp,
    food,
    perCount,
    perGram,
    perTbsp,
    servingPerContainer,
    unit,
  }
  if (unit === 'GRAM') {
    if (countToGram && (perCount || perCount === 0)) {
      return (amount / countToGram) * perCount
      // per gram exists, including when it is zero
    } else if (perGram || perGram === 0) {
      return amount * perGram
    } else {
      return handleError(
        `Error: calculatePerFood and GRAM: ${JSON.stringify(data)}`
      )
    }
  } else if (volumeUnits.includes(unit)) {
    const tbsp = mapOtherVolumeUnitToTbsp(unit, amount)
    if ((perCount || perCount === 0) && countToTbsp) {
      return (tbsp / countToTbsp) * perCount
    } else {
      return tbsp * (perTbsp as number)
    }
  } else if (unit === 'OZ' || unit === 'LBS') {
    const grams = convertFromWeightToGrams(unit, amount)
    if (countToGram && (perCount || perCount === 0)) {
      return (grams / countToGram) * perCount
    } else if (perGram) {
      return grams * perGram
    } else {
      return handleError(
        `Error: calculatePerFood and OZ/LBS: ${JSON.stringify(data)}`
      )
    }
  } else {
    const countToUse =
      unit === 'CONTAINER' && servingPerContainer
        ? amount * servingPerContainer
        : amount
    // The unit MUST be COUNT or CONTAINER
    // The classic: slice of cheese is 30 grams (countToGram) * calories per gram of cheese * amount of slices
    if ((countToGram || countToGram === 0) && (perGram || perGram === 0)) {
      return countToUse * countToGram * perGram
    } else if (perCount || perCount === 0) {
      return countToUse * perCount
    } else {
      return handleError(
        `Error: calculatePerFood and COUNT ${JSON.stringify(data)}`
      )
    }
  }
}

/** Given a food and a unit (protein/calorie) returns the perGram, perTbsp, and perCount amount */
export const getMeasurements = (
  metric: QuickAddUnit,
  food: Food
): [
  number | null,
  number | null,
  number | null,
  number | null,
  number | null,
  number | null
] => {
  const countToGram = food.countToGram
  const countToTbsp = food.countToTbsp
  const servingPerContainer = food.servingPerContainer

  if (metric === 'PROTEIN') {
    const perGram = food.proteinPerGram
    const perTbsp = calculateProteinPerTbsp(food)
    const perCount = food.proteinPerCount

    return [
      perGram,
      perTbsp,
      countToGram,
      perCount,
      countToTbsp,
      servingPerContainer,
    ]
  }

  const perGram = food.caloriesPerGram
  const perTbsp = calculateCaloriesPerTbsp(food)
  const perCount = food.caloriesPerCount
  return [
    perGram,
    perTbsp,
    countToGram,
    perCount,
    countToTbsp,
    servingPerContainer,
  ]
}

export const calculatePerMacroPerFood = (
  amount: number,
  unit: Unit,
  food: Food,
  metric: QuickAddUnit
) => {
  const [
    perGram,
    perTbsp,
    countToGram,
    perCount,
    countToTbsp,
    servingPerContainer,
  ] = getMeasurements(metric, food)
  return calculatePerFood(
    food,
    amount,
    unit,
    perGram,
    perTbsp,
    countToGram,
    perCount,
    countToTbsp,
    servingPerContainer
  )
}

export const calculatePerMacroPerRecipe = (
  recipe: Recipe,
  metric: QuickAddUnit,
  amount: number
): number => {
  const result = recipe.ingredients.reduce((acc, ingredient) => {
    const childRecipe = ingredient.ingredientToChildRecipe

    const food =
      ingredient.ingredientToFood || ingredient.ingredientToBasicFood || null

    if (food) {
      const [
        perGram,
        perTbsp,
        countToGram,
        perCount,
        countToTbsp,
        servingPerContainer,
      ] = getMeasurements(metric, food)
      return (
        acc +
        calculatePerFood(
          food,
          ingredient.amount,
          ingredient.unit,
          perGram,
          perTbsp,
          countToGram,
          perCount,
          countToTbsp,
          servingPerContainer
        )
      )
    } else if (childRecipe) {
      return acc + calculatePerMacroPerRecipe(childRecipe, metric, amount)
    } else {
      return handleError(
        `Error: calculatePerMacroPerRecipe: ${JSON.stringify({
          amount,
          metric,
          recipe,
        })}`
      )
    }
  }, 0)
  return result * amount
}

/** This function calculates the total calories, protein in all logs present for a given metric */
export const calculatePerMacro = (metric: QuickAddUnit, logs: Log[]) => {
  return logs.reduce((total, log) => {
    const { amount, barcode, unit } = log
    const food = log.logToFood
    const recipe = log.logToRecipe
    // EXERCISE is the "odd unit out"
    // If the metric and log do not match up exactly
    // Return 0 no matter what!
    if (metric === 'EXERCISE') {
      if (unit === 'EXERCISE') {
        return total + log.amount
      } else {
        return total
      }
    } else if (barcode) {
      if (unit === 'COUNT') {
        if (metric === 'PROTEIN') {
          return total + amount * barcode.protein_per_serving
        } else {
          return total + amount * barcode.calories_per_serving
        }
      } else {
        if (metric === 'PROTEIN') {
          return total + amount * barcode.protein_per_gram
        } else {
          return total + amount * barcode.calories_per_gram
        }
      }
    } else if (unit === metric) {
      // EX: If the log is of type CALORIE | PROTEIN
      return total + amount
    } else if (food) {
      return total + calculatePerMacroPerFood(amount, unit, food, metric)
    } else if (recipe) {
      return total + calculatePerMacroPerRecipe(recipe, metric, amount)
    } else {
      // If food is null and the metric does not exist, do nothing
      return total
    }
  }, 0)
}

/** It applies the calculatePerMacro function to all metrics, namely, CALORIE, PROTEIN
 *
 * It returns [caloriesConsumed, proteinConsumed]
 */
export const calculateMacros = (logs: Log[]) => {
  const caloriesConsumed = calculatePerMacro('CALORIE', logs)
  const proteinConsumed = calculatePerMacro('PROTEIN', logs)
  const exerciseDone = calculatePerMacro('EXERCISE', logs)
  return [caloriesConsumed, proteinConsumed, exerciseDone]
}
