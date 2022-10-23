import { basicFoodsKey, profileKey } from '../../helpers/data/constants'
import { isBrowser } from '../../helpers/data/isBrowser'
import { Food } from '../../models/Food/model'
import { Profile } from '../../models/Profile/model'
import { Data } from './types'

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
