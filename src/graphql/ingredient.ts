import { gql } from '../helpers/gql'

export const INGREDIENT_FRAGMENT = gql`
  fragment ingredient on ingredients {
    ...ingredient_base
    ingredientToFood {
      ...food
    }
    ingredientToChildRecipe {
      ...recipe_base
      ingredients {
        ...ingredient_base
      }
    }
  }
`
