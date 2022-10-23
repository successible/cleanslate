import { defaultTargets, Profile } from '../../models/Profile/model'

export const profileIsLoaded = (profile: Profile) => {
  // If the calorie target is the default, the profile has not yet loaded
  return profile.calorieTarget !== defaultTargets[0]
}
