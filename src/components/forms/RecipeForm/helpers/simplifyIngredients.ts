import { Unit } from '../../../../constants/units'
import { Ingredient } from '../../../../models/ingredient'
import { condenseSimpleIngredient } from './condenseSimplifyIngredient'

export type SimpleIngredient = {
  unit: Unit
  amount: number
  food: string | undefined
  childRecipe: string | undefined
}

export const simplifyIngredients = (
  ingredients: Ingredient[] | undefined
): SimpleIngredient[] => {
  if (!ingredients) {
    return [] as SimpleIngredient[]
  } else {
    return ingredients
      .map((ingredient) => {
        return {
          amount: ingredient.amount,
          childRecipe: ingredient.ingredientToChildRecipe?.id,
          food: ingredient.ingredientToFood?.id,
          unit: ingredient.unit,
        }
      })
      .sort((a, b) =>
        condenseSimpleIngredient(a).localeCompare(condenseSimpleIngredient(b))
      )
  }
}
