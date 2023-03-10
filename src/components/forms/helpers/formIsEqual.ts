import dotProp from 'dot-prop-immutable'
import equal from 'fast-deep-equal'
import { simplifyIngredients } from '../RecipeForm/helpers/simplifyIngredients'

export const formIsEqual = (
  state: Record<string, any>,
  item: Record<string, any>
) => {
  const newItem = dotProp.set(
    item,
    'ingredients',
    simplifyIngredients(item.ingredients)
  )

  const newState = dotProp.set(
    state,
    'ingredients',
    simplifyIngredients(state.ingredients)
  )

  const diff = Object.keys(newState).filter((key) => {
    const A = newState[key]
    const B = newItem[key]

    if (Array.isArray(A) && Array.isArray(B)) {
      return equal(A, B)
    }

    return String(A) === String(B)
  })

  return diff.length !== Object.keys(newState).length
}
