import { basicFoodsKey, fetchBasicFoodsKey, profileKey } from './constants'

export const clearCache = () => {
  localStorage.setItem(profileKey, 'null')
  localStorage.setItem(basicFoodsKey, 'null')
  localStorage.setItem(fetchBasicFoodsKey, 'null')
}
