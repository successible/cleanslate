import { gql } from "../helpers/gql";

export const EXERCISE_LOG_FRAGMENT = gql`
  fragment exercise_log on exercise_logs {
    id
    createdAt
    updatedAt
    type
    profile
    amount
    name
    weight
    duration
    pace
    incline
    power
    groupName
    category
  }
`;

export const CREATE_EXERCISE_LOG = gql`
  mutation CREATE_EXERCISE_LOG($object: exercise_logs_insert_input!) {
    insert_exercise_logs_one(object: $object) {
      ...exercise_log
    }
  }
`;

export const UPDATE_EXERCISE_LOG = gql`
  mutation UPDATE_LOG(
    $pk_columns: exercise_logs_pk_columns_input!
    $set: exercise_logs_set_input
  ) {
    update_exercise_logs_by_pk(pk_columns: $pk_columns, _set: $set) {
      ...exercise_log
    }
  }
`;

export const DELETE_EXERCISE_LOG = gql`
  mutation DELETE_EXERCISE_LOG($id: uuid!) {
    delete_exercise_logs_by_pk(id: $id) {
      id
    }
  }
`;
