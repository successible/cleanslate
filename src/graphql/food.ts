import { gql } from '../helpers/gql'

export const FOOD_FRAGMENT = gql`
  fragment food on foods {
    id
    basicFoodId
    name
    countName
    containerName
    group
    category
    alias
    caloriesPerGram
    proteinPerGram
    caloriesPerCount
    proteinPerCount
    countToGram
    countToTbsp
    tbspToGram
    servingPerContainer
    preferredVolumeUnit
    preferredWeightUnit
    createdAt
    updatedAt
    type
    profile
    foodToProfile {
      id
      authId
      showDensities
    }
  }
`

export const CREATE_FOOD = gql`
  mutation CREATE_FOOD($object: foods_insert_input!) {
    insert_foods_one(object: $object) {
      id
    }
  }
`

export const UPDATE_FOOD = gql`
  mutation UPDATE_FOOD(
    $pk_columns: foods_pk_columns_input!
    $set: foods_set_input
  ) {
    update_foods_by_pk(pk_columns: $pk_columns, _set: $set) {
      id
    }
  }
`

export const DELETE_FOOD = gql`
  mutation DELETE_FOOD($id: uuid!) {
    delete_foods_by_pk(id: $id) {
      id
    }
  }
`

export const SUBSCRIBE_TO_BASIC_FOOD = gql`
  subscription SUBSCRIBE_TO_BASIC_FOOD {
    foods(
      where: { basicFoodId: { _is_null: false } }
      limit: 1
      order_by: { updatedAt: desc }
    ) {
      ...food
    }
  }
`
