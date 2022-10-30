import { gql } from '../../helpers/data/gql'

export const RECIPE_BASE_FRAGMENT = gql`
  fragment recipe_base on recipes {
    id
    name
    countName
    containerName
    servingPerContainer
    profile
    createdAt
    type
    recipeToProfile {
      id
      authId
      showDensities
    }
  }
`

export const INGREDIENT_BASE_FRAGMENT = gql`
  fragment ingredient_base on ingredients {
    id
    amount
    unit
    profile
    createdAt
    type
    ingredientToFood {
      ...food
    }
    ingredientToProfile {
      id
      authId
      showDensities
    }
  }
`
