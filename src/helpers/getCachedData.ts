import { Food } from '../models/food'
import { Profile } from '../models/profile'
import { Data } from '../store/data/types'
import { basicFoodsKey, profileKey } from './constants'
import { isBrowser } from './isBrowser'

const isValid = (x: string | null) =>
  ![null, undefined, '', 'null', 'undefined'].includes(x)

export const getCachedData = (): Data => {
  const cachedProfile = isBrowser() ? localStorage.getItem(profileKey) : null

  const cachedBasicFoods = isBrowser()
    ? localStorage.getItem(basicFoodsKey)
    : null

  const profiles = isValid(cachedProfile)
    ? (JSON.parse(cachedProfile as string) as Profile[])
    : [new Profile()]

  const basicFoods = isValid(cachedBasicFoods)
    ? (JSON.parse(cachedBasicFoods as string) as Food[])
    : ([] as Food[])

  return { basicFoods, profiles }
}
