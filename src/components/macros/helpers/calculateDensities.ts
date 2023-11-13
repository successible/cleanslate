import { round } from '../../../helpers/round'
import { Food } from '../../../models/food'
import { Barcode } from '../../../models/log'
import { Recipe } from '../../../models/recipe'
import { convertToGrams } from './convertToGrams'

// Helpers //

export const getCaloricDensityFromPerGram = (caloriesPerGram: number) =>
  round(caloriesPerGram * 100, 0)
export const getProteinDensityFromPerGram = (
  caloriesPerGram: number,
  proteinPerGram: number
) => round(((proteinPerGram * 4) / caloriesPerGram) * 100, 0)

export const getCaloricDensityFromCount = (
  countToGram: number,
  caloriesPerCount: number
) => round(((caloriesPerCount || 0) * 100) / countToGram, 0)

export const getProteinDensityFromCount = (
  caloriesPerCount: number,
  proteinPerCount: number
) => round((((proteinPerCount || 0) * 4) / (caloriesPerCount || 0)) * 100, 0)

export const calculateCombinedDensity = (
  caloricDensity: number,
  proteinDensity: number
) => {
  return round(proteinDensity / caloricDensity, 1) * 10
}

/** Given a food, calculate the caloric density and percentage protein.
 * Then, pass those numbers to calculate the score */
export const calculateFoodDensities = (
  food: Food
): [number, number, number] => {
  const {
    caloriesPerCount,
    caloriesPerGram,
    countToGram,
    proteinPerCount,
    proteinPerGram,
  } = food

  if (caloriesPerGram && proteinPerGram) {
    const CD = getCaloricDensityFromPerGram(caloriesPerGram)
    const PD = getProteinDensityFromPerGram(caloriesPerGram, proteinPerGram)
    return [CD, PD, calculateCombinedDensity(CD, PD)]
    // This accounts for the scenario where the protein content is 0 but calories exist
    // This is especially common for foods like oils and pure sugars
  } else if (proteinPerGram === 0) {
    const CD = getCaloricDensityFromPerGram(caloriesPerGram || 0)
    return [CD, 0, 0]
    // If the custom food was defined using counts AND the user also provided a count to gram
    // Then we can calculate a caloric density
  } else if (countToGram && caloriesPerCount && proteinPerCount) {
    const CD = getCaloricDensityFromCount(countToGram, caloriesPerCount)
    const PD = getProteinDensityFromCount(caloriesPerCount, proteinPerCount)
    return [CD, PD, calculateCombinedDensity(CD, PD)]
  } else {
    return [-1, -1, -1]
  }
}

/** For a given recipe, calculate the weight of each ingredient in grams, then sum up the weight into one number */
export const calculateGramsInRecipe = (
  recipe: Recipe,
  amount: number | null
): number => {
  const recipeInGrams = recipe.ingredients.reduce((acc, ingredient) => {
    return (
      acc +
      convertToGrams(
        ingredient.amount,
        ingredient.unit,
        ingredient.ingredientToFood?.countToGram,
        ingredient.ingredientToFood?.tbspToGram,
        ingredient.ingredientToFood?.countToTbsp,
        ingredient.ingredientToFood?.servingPerContainer
      )
    )
  }, 0)
  return amount ? recipeInGrams * amount : recipeInGrams
}

/** Given the calories and protein totals for a recipe, calculate the caloric density and percentage protein,
 * Then, pass those numbers to calculate the score */
export const calculateRecipeDensities = (
  amount: number | null,
  caloriesConsumed: number,
  proteinConsumed: number,
  recipe: Recipe
): [number, number, number] => {
  // Unlike food, the caloric density of recipe is calculated from caloriesConsumed
  // Thus, it must take into account the amount of the recipe
  // Otherwise, calculateGramsInRecipe will return the wrong amount as the amount > 1
  const caloriesPerGram =
    caloriesConsumed / calculateGramsInRecipe(recipe, amount)
  const CD = round(caloriesPerGram * 100, 0)
  const PD = round((proteinConsumed / caloriesConsumed) * 4 * 100, 0)
  return [CD, PD, calculateCombinedDensity(CD, PD)]
}

/** Calculate the food score OR recipe score when you are unsure which you have been given */
export const calculateFoodOrRecipeDensities = (
  amount: number | null,
  item: Barcode | Food | Recipe | undefined | null,
  caloriesConsumed: number,
  proteinConsumed: number
): [number, number, number] | null => {
  if (!item) return null
  if ('code' in item) {
    const barcode = item
    const { calories_per_gram, calories_per_serving, protein_per_serving } =
      barcode
    const weightPerServing = calories_per_serving / calories_per_gram
    const caloricDensity = (calories_per_serving / weightPerServing) * 100
    const proteinDensity = (protein_per_serving / weightPerServing) * 100
    return [
      round(caloricDensity, 0),
      round(proteinDensity, 0),
      calculateCombinedDensity(caloricDensity, proteinDensity),
    ]
  } else {
    const output =
      item.type === 'food'
        ? calculateFoodDensities(item)
        : item.type === 'recipe'
          ? calculateRecipeDensities(
              amount,
              caloriesConsumed,
              proteinConsumed,
              item
            )
          : null
    return output
  }
}
