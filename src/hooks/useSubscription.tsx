import React from 'react'
import type { SubscriptionClient } from 'subscriptions-transport-ws'
import { getLoginStatus } from '../helpers/getLoginStatus'
import { getWebsocketClient } from '../helpers/getWebsocketClient'
import { isLoadedUser } from '../helpers/isLoadedUser'
import { isOffline } from '../helpers/isOffline'
import type { Profile } from '../models/profile'
import type { UserStatus } from '../store/navbar/types'

export type Subscriber = (
  client: SubscriptionClient,
  profile?: Profile
) => {
  unsubscribe: () => void
}

export const useSubscription = (
  subscribers: Subscriber[],
  user: UserStatus,
  offline: boolean,
  profile: Profile
) => {
  const isOnline = !isOffline(offline)
  React.useEffect(() => {
    if (getLoginStatus() && isOnline && isLoadedUser(user)) {
      getWebsocketClient().then((client) => {
        subscribers.forEach((subscriber) => {
          subscriber(client, profile)
        })
      })
    }
  }, [user, offline])
}
