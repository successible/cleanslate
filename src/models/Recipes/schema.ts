import { gql } from '../../helpers/data/gql'

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
