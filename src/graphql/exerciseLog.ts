import { gql } from '../helpers/gql'

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
`

export const CREATE_EXERCISE_LOG = gql`
  mutation CREATE_EXERCISE_LOG($object: exercise_logs_insert_input!) {
    insert_exercise_logs_one(object: $object) {
      ...log
    }
  }
`
