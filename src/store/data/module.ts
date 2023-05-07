import { produce } from 'immer'
import { StoreonModule } from 'storeon'
import { HANDLE_MISSING_BASIC_FOODS } from '../../graphql/food'
import { profileKey } from '../../helpers/constants'
import { getHasuraClient } from '../../helpers/getHasuraClient'
import { handleError } from '../../helpers/handleError'
import { isBrowser } from '../../helpers/isBrowser'
import { addBasicFoodsToProfile } from '../../helpers/profile/addBasicFoodsToProfile'
import { stringifyQuery } from '../../helpers/stringifyQuery'
import { CleanslateSlices } from '../store'
import { createInitialSlice } from './createInitialSlice'
import { DataEvents } from './types'

const updateAndCacheProfile = (state: Readonly<CleanslateSlices>) => {
  const profileWithBasicsFoods = addBasicFoodsToProfile(
    state.data.profiles
  ).profiles

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

  store.on('handleMissingBasicFoods', (state, missingBasicFoods) => {
    if (missingBasicFoods.length >= 1) {
      getHasuraClient()
        .then((client) => {
          client
            .request(stringifyQuery(HANDLE_MISSING_BASIC_FOODS), {
              ids: missingBasicFoods,
            })
            .then((result) => {
              console.log(result)
            })
        })
        .catch((error) => {
          handleError(error)
        })
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

  store.on('removeLogsById', (state, ids) => {
    return updateAndCacheProfile(
      produce(state, (draft) => {
        const logs = state.data.profiles[0].logs
        const newLogs = logs.filter((log) => !ids.includes(log.id))
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
