import { UPDATE_PROFILE } from '../../graphql/profile'
import { getHasuraClient } from '../getHasuraClient'
import { stringifyQuery } from '../stringifyQuery'

type UpdateTargets = {
  id: string
  set: {
    apiToken?: string
    calorieTarget?: string | number
    convertBetweenUnits?: boolean
    countDown?: boolean
    enablePlanning?: boolean
    hidePWAPrompt?: boolean
    metricSystem?: boolean
    proteinTarget?: string | number
    showCalories?: boolean
    showDensities?: boolean
    startTime?: string
  }
}

export const updateProfileOnCloud = (
  variables: UpdateTargets,
  onSuccess: () => void
) => {
  getHasuraClient().then((client) => {
    client.request(stringifyQuery(UPDATE_PROFILE), variables).then(() => {
      onSuccess()
    })
  })
}
