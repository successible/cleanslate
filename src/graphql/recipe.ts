import { gql } from '../helpers/gql'

export const RECIPE_BASE_FRAGMENT = gql`
  fragment recipe_base on recipes {
    containerName
    countName
    countToGram
    countToTbsp
    createdAt
    id
    name
    preferredVolumeUnit
    preferredWeightUnit
    profile
    servingPerContainer
    servingPerContainer
    type
    recipeToProfile {
      authId
      id
      showDensities
    }
  }
`

export const INGREDIENT_BASE_FRAGMENT = gql`
  fragment ingredient_base on ingredients {
    amount
    barcode
    basicFood
    createdAt
    food
    id
    profile
    recipe
    type
    unit
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

export const RECIPE_FRAGMENT = gql`
  fragment recipe on recipes {
    ...recipe_base
    ingredients {
      ...ingredient
    }
  }
`

export const CREATE_RECIPE = gql`
  mutation CREATE_RECIPE($object: recipes_insert_input!) {
    insert_recipes_one(object: $object) {
      id
    }
  }
`

export const UPDATE_RECIPE = gql`
  mutation UPDATE_RECIPE(
    $pk_columns: recipes_pk_columns_input!
    $set: recipes_set_input
    $ingredients_to_delete: [uuid!] = ""
    $ingredients_to_insert: [ingredients_insert_input!]!
  ) {
    delete_ingredients(where: { id: { _in: $ingredients_to_delete } }) {
      returning {
        id
      }
    }

    insert_ingredients(objects: $ingredients_to_insert) {
      returning {
        id
      }
    }

    update_recipes_by_pk(pk_columns: $pk_columns, _set: $set) {
      id
    }
  }
`

export const DELETE_RECIPE = gql`
  mutation DELETE_RECIPE($id: uuid!) {
    delete_recipes_by_pk(id: $id) {
      id
    }
  }
`
