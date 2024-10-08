import { volumeUnits, weightUnits } from '../../../constants/units'
import { Unit } from '../../../constants/units'
import { handleError } from '../../../helpers/handleError'
import { ExerciseLog } from '../../../models/exerciseLog'
import { Food } from '../../../models/food'
import { Log } from '../../../models/log'
import { QuickLog } from '../../../models/quickLog'
import { Recipe } from '../../../models/recipe'
import { convertFromWeightToGrams } from './convertFromWeightToGrams'
import { mapOtherVolumeUnitToTbsp } from './mapOtherVolumeUnitToTbsp'

type Macro = 'CALORIE' | 'PROTEIN'

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
    } else {
      return amount * (perGram || 0)
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
    } else {
      return grams * (perGram || 0)
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
    } {
      return countToUse * (perCount || 0)
    }
  }
}

/** Given a food and a unit (protein/calorie) returns the perGram, perTbsp, and perCount amount */
export const getMeasurements = (
  metric: Macro,
  food: Food
): [
  number | null,
  number | null,
  number | null,
  number | null,
  number | null,
  number | null,
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
  metric: Macro
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
  metric: Macro,
  amount: number,
  unit: Unit
): number => {
  const { countToGram, countToTbsp, servingPerContainer } = recipe
  const isVolume = volumeUnits.includes(unit) && countToTbsp
  const isWeight = weightUnits.includes(unit) && countToGram

  const countAdjustedForVolumeAndWeight = isVolume
    ? mapOtherVolumeUnitToTbsp(unit, amount) / countToTbsp
    : isWeight
      ? convertFromWeightToGrams(unit, amount) / countToGram
      : amount

  // The default behavior of recipe is too assume that a COUNT stands for everything
  // However, if servingPerContainer has been set, COUNT becomes serving, and CONTAINER is the countName (e.g. bowl)
  // Hence, we need to divide the count accordingly

  const countAdjustedForContainer =
    unit === 'COUNT' && servingPerContainer && servingPerContainer !== 0
      ? countAdjustedForVolumeAndWeight / servingPerContainer
      : countAdjustedForVolumeAndWeight

  const total = recipe.ingredients.reduce((acc, ingredient) => {
    const childRecipe = ingredient.ingredientToChildRecipe
    const food = ingredient.ingredientToFood
    const barcode = ingredient.barcode

    if (barcode) {
      if (ingredient.unit === 'COUNT') {
        if (metric === 'PROTEIN') {
          return acc + ingredient.amount * barcode.protein_per_serving
        } else {
          return acc + ingredient.amount * barcode.calories_per_serving
        }
      } else {
        if (metric === 'PROTEIN') {
          return acc + ingredient.amount * barcode.protein_per_gram
        } else {
          return acc + ingredient.amount * barcode.calories_per_gram
        }
      }
    } else if (food) {
      const [
        perGram,
        perTbsp,
        countToGram,
        perCount,
        countToTbsp,
        servingPerContainer,
      ] = getMeasurements(metric, food)
      const macro = calculatePerFood(
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
      return acc + macro
    } else if (childRecipe) {
      const macro = calculatePerMacroPerRecipe(
        childRecipe,
        metric,
        ingredient.amount,
        ingredient.unit
      )
      return acc + macro
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

  return total * countAdjustedForContainer
}

/** This function calculates the total calories, protein in all logs present for a given metric */
export const calculatePerMacroInLog = (metric: Macro, logs: Log[]) => {
  return logs.reduce((total, log) => {
    const { amount, barcode, unit } = log
    if (amount === 0) {
      return 0
    }
    const food = log.logToFood
    const recipe = log.logToRecipe
    if (barcode) {
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
    } else if (food) {
      return total + calculatePerMacroPerFood(amount, unit, food, metric)
    } else if (recipe) {
      return total + calculatePerMacroPerRecipe(recipe, metric, amount, unit)
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
export const calculateMacros = (
  logs: Log[],
  quick_logs: QuickLog[],
  exercise_logs: ExerciseLog[]
) => {
  const caloriesConsumedFromLogs = calculatePerMacroInLog('CALORIE', logs)
  const proteinConsumedFromLogs = calculatePerMacroInLog('PROTEIN', logs)

  const caloriesConsumedFromQuickLogs = (quick_logs || []).reduce(
    (acc, item) => {
      return acc + item.calories
    },
    0
  )

  const proteinConsumedFromQuickLogs = (quick_logs || []).reduce(
    (acc, item) => {
      return acc + item.protein
    },
    0
  )

  const caloriesBurnedFromExercise = (exercise_logs || []).reduce(
    (acc, item) => {
      return acc + item.amount
    },
    0
  )

  const protein = proteinConsumedFromLogs + proteinConsumedFromQuickLogs
  return [
    caloriesConsumedFromLogs,
    caloriesConsumedFromQuickLogs,
    caloriesBurnedFromExercise,

    protein,
  ]
}
