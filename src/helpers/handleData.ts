import type { Data } from '../store/data/types'
import { firebaseEnabled } from './getFirebaseConfig'
import { getStore } from './getStore'
import { login } from './login'
import { addBasicFoodsToProfile } from './profile/addBasicFoodsToProfile'
import { createProfile } from './profile/createProfile'

export const handleData = (data: Data) => {
  const newData = data as Data
  const store = getStore()
  if (
    (!newData || !newData.profiles || newData.profiles.length === 0) &&
    firebaseEnabled
  ) {
    createProfile().then(() => {
      login()
      window.location.reload()
    })
  } else {
    // We update the entire profile with every subscription
    // That is because the payload is small
    const { profiles } = addBasicFoodsToProfile(newData.profiles)
    store.dispatch('updateProfile', profiles)
  }
}
