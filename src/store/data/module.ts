import { produce } from 'immer'
import { StoreonModule } from 'storeon'
import { profileKey } from '../../helpers/constants'
import { isBrowser } from '../../helpers/isBrowser'
import { addBasicFoodsToProfile } from '../../helpers/profile/addBasicFoodsToProfile'
import { CleanslateSlices } from '../store'
import { createInitialSlice } from './createInitialSlice'
import { DataEvents } from './types'

const updateAndCacheProfile = (state: Readonly<CleanslateSlices>) => {
  const profileWithBasicsFoods = addBasicFoodsToProfile(state.data.profiles)

  const newState = produce(state, (draft) => {
    draft.data.profiles = profileWithBasicsFoods
  })

  if (isBrowser()) {
    localStorage.setItem(profileKey, JSON.stringify(profileWithBasicsFoods))
  }

  return newState
}

export const data: StoreonModule<CleanslateSlices, DataEvents> = (store) => {
  store.on('@init', () => createInitialSlice())

  store.on('updateCurrentWebsocketClient', (state, client) => {
    if (client) {
      return produce(state, (draft) => {
        // @ts-ignore
        draft.currentWebsocketClient = client
      })
    } else {
      return state
    }
  })

  store.on('addLogs', (state, logs) => {
    return updateAndCacheProfile(
      produce(state, (draft) => {
        draft.data.profiles[0].logs.push(...logs)
      })
    )
  })

  store.on('updateLog', (state, updatedLog) => {
    return updateAndCacheProfile(
      produce(state, (draft) => {
        const logs = state.data.profiles[0].logs
        const newLogs = logs.map((log) =>
          log.id === updatedLog.id ? updatedLog : log
        )
        draft.data.profiles[0].logs = newLogs
      })
    )
  })

  store.on('removeLogById', (state, id) => {
    return updateAndCacheProfile(
      produce(state, (draft) => {
        const logs = state.data.profiles[0].logs
        const newLogs = logs.filter((log) => log.id !== id)
        draft.data.profiles[0].logs = newLogs
      })
    )
  })

  store.on('updateProfile', (state, newProfile) => {
    return updateAndCacheProfile(
      produce(state, (draft) => {
        draft.data.profiles = newProfile
      })
    )
  })
}
