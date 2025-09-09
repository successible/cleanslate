import { gql } from '../helpers/gql'

export const PROFILE_FRAGMENT = gql`
  fragment profile on profiles {
    apiToken
    apiTokenLastRegenerated
    authId
    calorieTarget
    convertBetweenUnits
    countDown
    createdAt
    enablePlanning
    hidePWAPrompt
    id
    metricSystem
    proteinTarget
    showCalories
    showDensities
    startTime
    timezone
    type
    updatedAt
  }
`

export const GET_PROFILE = gql`
  query GetProfiles($token: String) {
    profiles(where: { authId: { _eq: $token } }) {
      authId
      id
    }
  }
`

export const UPDATE_PROFILE = gql`
  mutation UPDATE_PROFILE($id: uuid!, $set: profiles_set_input) {
    update_profiles(where: { id: { _eq: $id } }, _set: $set) {
      returning {
        id
      }
    }
  }
`

export const DELETE_ALL_PROFILES = gql`
  mutation DELETE_PROFILES {
    delete_profiles(where: {}) {
      returning {
        id
      }
    }
  }
`

export const DELETE_PROFILE = gql`
  mutation DELETE_PROFILE($authId: String!) {
    delete_profiles(where: { authId: { _eq: $authId } }) {
      returning {
        id
      }
    }
  }
`

export const SUBSCRIBE_TO_DATA = gql`
  subscription SUBSCRIBE_TO_DATA($today: timestamptz, $tomorrow: timestamptz) {
    profiles {
      ...profile

      foods {
        ...food
      }

      recipes {
        ...recipe
      }

      logs(where: { createdAt: { _gte: $today, _lte: $tomorrow } }) {
        ...log
      }

      quick_logs(where: { createdAt: { _gte: $today, _lte: $tomorrow } }) {
        ...quick_log
      }

      exercise_logs(where: { createdAt: { _gte: $today, _lte: $tomorrow } }) {
        ...exercise_log
      }
    }
  }
`
