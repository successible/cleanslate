import { StoreonModule } from 'storeon'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { Food } from '../../models/food'
import { Log } from '../../models/log'
import { Profile } from '../../models/profile'
import { Recipe } from '../../models/recipe'

export type Data = { profiles: Profile[]; basicFoods: Food[] }

export type Model = Food | Log | Profile | Recipe
export type Type = 'food' | 'log' | 'profile' | 'recipe' | 'ingredient' | 'unit'
export type Collections = 'foods' | 'logs' | 'recipes'

export type DataSlice = {
  data: Data
  currentWebsocketClient: SubscriptionClient | null
}

export type DataEvents = {
  updateProfile: Profile[]
  updateBasicFoods: Food[]
  updateCurrentWebsocketClient: SubscriptionClient | null
}

export type DataEventsKeys = keyof DataEvents

export type DataModule = StoreonModule<DataSlice, DataEvents>
