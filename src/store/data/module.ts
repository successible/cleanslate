import { produce } from 'immer'
import { StoreonModule } from 'storeon'
import { profileKey } from '../../helpers/constants'
import { isBrowser } from '../../helpers/isBrowser'
import { addBasicFoodsToProfile } from '../../helpers/profile/addBasicFoodsToProfile'
import { Profile } from '../../models/profile'
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

  store.on('clearData', (state) => {
    return produce(state, (draft) => {
      draft.data.profiles = [new Profile()]
      draft.data.basicFoods = []
    })
  })

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

  store.on('addQuickLogs', (state, quick_logs) => {
    return updateAndCacheProfile(
      produce(state, (draft) => {
        draft.data.profiles[0].quick_logs.push(...quick_logs)
      })
    )
  })

  store.on('addExerciseLogs', (state, exercise_logs) => {
    return updateAndCacheProfile(
      produce(state, (draft) => {
        draft.data.profiles[0].exercise_logs.push(...exercise_logs)
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

  store.on('updateQuickLog', (state, updatedQuickLog) => {
    return updateAndCacheProfile(
      produce(state, (draft) => {
        const quick_logs = state.data.profiles[0].quick_logs
        const newQuickLogs = quick_logs.map((quickLog) =>
          quickLog.id === updatedQuickLog.id ? updatedQuickLog : quickLog
        )
        draft.data.profiles[0].quick_logs = newQuickLogs
      })
    )
  })

  store.on('updateExerciseLog', (state, updatedExerciseLog) => {
    return updateAndCacheProfile(
      produce(state, (draft) => {
        const exercise_logs = state.data.profiles[0].exercise_logs
        const newExerciseLogs = exercise_logs.map((exerciseLog) =>
          exerciseLog.id === updatedExerciseLog.id
            ? updatedExerciseLog
            : exerciseLog
        )
        draft.data.profiles[0].exercise_logs = newExerciseLogs
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

  store.on('removeQuickLogsById', (state, ids) => {
    return updateAndCacheProfile(
      produce(state, (draft) => {
        const quick_logs = state.data.profiles[0].quick_logs
        const newQuickLogs = quick_logs.filter(
          (quick_log) => !ids.includes(quick_log.id)
        )
        draft.data.profiles[0].quick_logs = newQuickLogs
      })
    )
  })

  store.on('removeExerciseLogsById', (state, ids) => {
    return updateAndCacheProfile(
      produce(state, (draft) => {
        const exercise_logs = state.data.profiles[0].exercise_logs
        const newExerciseLogs = exercise_logs.filter(
          (exercise_log) => !ids.includes(exercise_log.id)
        )
        draft.data.profiles[0].exercise_logs = newExerciseLogs
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
