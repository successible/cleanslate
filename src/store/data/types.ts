import { StoreonModule } from 'storeon'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { ExerciseLog } from '../../models/exerciseLog'
import { Food } from '../../models/food'
import { Log } from '../../models/log'
import { Profile } from '../../models/profile'
import { QuickLog } from '../../models/quickLog'
import { Recipe } from '../../models/recipe'

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
  currentWebsocketClient: SubscriptionClient | null
}

export type DataEvents = {
  addExerciseLogs: ExerciseLog[]
  addLogs: Log[]
  addQuickLogs: QuickLog[]
  clearData: null
  removeLogsById: string[]
  removeQuickLogsById: string[]
  updateCurrentWebsocketClient: SubscriptionClient | null
  updateLog: Log
  updateProfile: Profile[]
  updateQuickLog: QuickLog
}

export type DataEventsKeys = keyof DataEvents

export type DataModule = StoreonModule<DataSlice, DataEvents>
