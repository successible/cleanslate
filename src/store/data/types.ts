import type { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import type { StoreonModule } from 'storeon'
import type { ExerciseLog } from '../../models/exerciseLog'
import type { Food } from '../../models/food'
import type { Log } from '../../models/log'
import type { Profile } from '../../models/profile'
import type { QuickLog } from '../../models/quickLog'
import type { Recipe } from '../../models/recipe'

export type Data = { profiles: Profile[]; basicFoods: Food[] }

export type Model = Food | Log | Profile | Recipe

export type Type =
  | 'food'
  | 'log'
  | 'profile'
  | 'recipe'
  | 'ingredient'
  | 'quick-log'
  | 'exercise-log'

export type Collections =
  | 'foods'
  | 'logs'
  | 'recipes'
  | 'quick-logs'
  | 'exercise-logs'

export type DataSlice = {
  data: Data
  currentWebsocketClient: GraphQLWsLink | null
}

export type DataEvents = {
  addExerciseLogs: ExerciseLog[]
  addLogs: Log[]
  addQuickLogs: QuickLog[]
  clearData: null
  removeExerciseLogsById: string[]
  removeLogsById: string[]
  removeQuickLogsById: string[]
  updateCurrentWebsocketClient: GraphQLWsLink | null
  updateExerciseLog: ExerciseLog
  updateLog: Log
  updateProfile: Profile[]
  updateQuickLog: QuickLog
}

export type DataEventsKeys = keyof DataEvents

export type DataModule = StoreonModule<DataSlice, DataEvents>
