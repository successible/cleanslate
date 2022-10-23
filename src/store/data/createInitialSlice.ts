import { getCachedData } from './getCachedData'
import { DataSlice } from './types'

export const createInitialSlice = (): DataSlice => {
  const { basicFoods, profiles } = getCachedData()
  return {
    currentWebsocketClient: null,
    data: { basicFoods, profiles },
  }
}
