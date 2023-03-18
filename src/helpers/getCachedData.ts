import { basicFoods } from '../components/app/App'
import { Profile } from '../models/profile'
import { Data } from '../store/data/types'
import { profileKey } from './constants'
import { isBrowser } from './isBrowser'

const isValid = (x: string | null) =>
  ![null, undefined, '', 'null', 'undefined'].includes(x)

export const getCachedData = (): Data => {
  const cachedProfile = isBrowser() ? localStorage.getItem(profileKey) : null

  const profiles = isValid(cachedProfile)
    ? (JSON.parse(cachedProfile as string) as Profile[])
    : [new Profile()]

  return { basicFoods: basicFoods, profiles }
}
