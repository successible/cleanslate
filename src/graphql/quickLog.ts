import { gql } from '../helpers/gql'

export const QUICK_LOG_FRAGMENT = gql`
  fragment quick_log on quick_logs {
    id
    createdAt
    updatedAt
    profile
    protein
    calories
    name
    consumed
    meal
    type
  }
`

export const CREATE_QUICK_LOG = gql`
  mutation CREATE_QUICK_LOG($object: quick_logs_insert_input!) {
    insert_quick_logs_one(object: $object) {
      ...log
    }
  }
`
export const DELETE_QUICK_LOG = gql`
  mutation DELETE_QUICK_LOG($id: uuid!) {
    delete_quick_logs_by_pk(id: $id) {
      id
    }
  }
`
