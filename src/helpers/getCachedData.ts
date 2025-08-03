import { Profile } from '../models/profile'
import type { Data } from '../store/data/types'
import { profileKey } from './constants'
import { getBasicFoods } from './Food/getBasicFoods'
import { isBrowser } from './isBrowser'

const { basicFoods } = getBasicFoods()

const isValid = (x: string | null) =>
  ![null, undefined, '', 'null', 'undefined'].includes(x)

export const getCachedData = (): Data => {
  const cachedProfile = isBrowser() ? localStorage.getItem(profileKey) : null

  const profiles = isValid(cachedProfile)
    ? (JSON.parse(cachedProfile as string) as Profile[])
    : [new Profile()]

  return { basicFoods, profiles }
}
