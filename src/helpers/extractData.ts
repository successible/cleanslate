import { store } from '../store/store'

export const extractData = (data = store.get().data) => {
  const { basicFoods, profiles } = data
  const profile = profiles[0]
  const { logs, recipes } = profile
  const customFoods = profile.foods
  const foods = [...basicFoods, ...customFoods]
  return { foods, logs, profile, recipes }
}
