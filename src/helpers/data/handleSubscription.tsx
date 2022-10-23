import React from 'react'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { Profile } from '../../models/Profile/model'
import { UserStatus } from '../../store/navbar/types'
import { getLoginStatus } from '../authentication/getLoginStatus'
import { isLoadedUser } from '../authentication/isLoadedUser'
import { getWebsocketClient } from './getWebsocketClient'
import { isOffline } from './isOffline'

export type Subscriber = (
  client: SubscriptionClient,
  profile?: Profile
) => {
  unsubscribe: () => void
}

export const handleSubscription = (
  subscribers: Subscriber[],
  user: UserStatus,
  offline: boolean,
  profile: Profile
) => {
  const isOnline = !isOffline(offline)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    if (getLoginStatus() && isOnline && isLoadedUser(user)) {
      getWebsocketClient().then((client) => {
        subscribers.forEach((subscriber) => {
          subscriber(client, profile)
        })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, offline, profile.startTime])
}
