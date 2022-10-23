import { SimpleIngredient } from './simplifyIngredients'

export const condenseSimpleIngredient = (i: SimpleIngredient) =>
  String(i.amount) + String(i.unit) + String(i.food) + String(i.food)
