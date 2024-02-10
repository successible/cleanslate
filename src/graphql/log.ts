import { gql } from '../helpers/gql'

export const LOG_FRAGMENT = gql`
  fragment log on logs {
    alias
    amount
    barcode
    basicFood
    consumed
    createdAt
    id
    meal
    type
    unit

    logToFood {
      ...food
    }

    logToRecipe {
      ...recipe
    }
  }
`

export const CREATE_LOG = gql`
  mutation CREATE_LOG($object: logs_insert_input!) {
    insert_logs_one(object: $object) {
      ...log
    }
  }
`

export const CREATE_LOGS = gql`
  mutation CREATE_LOGS($objects: [logs_insert_input!]!) {
    insert_logs(objects: $objects) {
      returning {
        ...log
      }
    }
  }
`

export const UPDATE_LOG = gql`
  mutation UPDATE_LOG(
    $pk_columns: logs_pk_columns_input!
    $set: logs_set_input
  ) {
    update_logs_by_pk(pk_columns: $pk_columns, _set: $set) {
      ...log
    }
  }
`

export const DELETE_LOG = gql`
  mutation DELETE_LOG($id: uuid!) {
    delete_logs_by_pk(id: $id) {
      id
    }
  }
`
export const DELETE_LOGS = gql`
  mutation DELETE_LOGS($id: [uuid!] = "") {
    delete_logs(where: { id: { _in: $id } }) {
      returning {
        id
      }
    }
  }
`
