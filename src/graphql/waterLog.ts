import { gql } from '../helpers/gql'

export const WATER_LOG_FRAGMENT = gql`
  fragment water_log on water_logs {
    id
    createdAt
    updatedAt
    profile
    amount
    unit
    type
  }
`

export const CREATE_WATER_LOG = gql`
  mutation CREATE_WATER_LOG($object: water_logs_insert_input!) {
    insert_water_logs_one(object: $object) {
      ...water_log
    }
  }
`

export const UPDATE_WATER_LOG = gql`
  mutation UPDATE_WATER_LOG(
    $pk_columns: water_logs_pk_columns_input!
    $set: water_logs_set_input
  ) {
    update_water_logs_by_pk(pk_columns: $pk_columns, _set: $set) {
      ...water_log
    }
  }
`

export const DELETE_WATER_LOG = gql`
  mutation DELETE_WATER_LOG($id: uuid!) {
    delete_water_logs_by_pk(id: $id) {
      id
    }
  }
`
