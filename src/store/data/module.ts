import dotProp from 'dot-prop-immutable'
import { StoreonModule } from 'storeon'
import { basicFoodsKey, profileKey } from '../../helpers/constants'
import { isBrowser } from '../../helpers/isBrowser'
import { CleanslateSlices } from '../store'
import { createInitialSlice } from './createInitialSlice'
import { DataEvents } from './types'

export const data: StoreonModule<CleanslateSlices, DataEvents> = (store) => {
  store.on('@init', () => createInitialSlice())

  store.on('updateCurrentWebsocketClient', (state, client) => {
    if (client) {
      return dotProp.set(state, 'currentWebsocketClient', client)
    } else {
      return state
    }
  })

  store.on('updateCurrentWebsocketClient', (state, client) => {
    if (client) {
      return dotProp.set(state, 'currentWebsocketClient', client)
    } else {
      return state
    }
  })

  store.on('updateProfile', (state, profiles) => {
    // The server returns all the data associated with the profile object, and you can just replace
    // Thus, you can replace the old profile object with the new one
    // You also want to update the data in local storage.
    if (isBrowser()) {
      localStorage.setItem(profileKey, JSON.stringify(profiles))
    }
    return dotProp.set(state, 'data.profiles', profiles)
  })

  store.on('updateBasicFoods', (state, basicFoods) => {
    // Same logic as updateProfile
    if (isBrowser()) {
      localStorage.setItem(basicFoodsKey, JSON.stringify(basicFoods))
    }
    return dotProp.set(state, 'data.basicFoods', basicFoods)
  })
}
