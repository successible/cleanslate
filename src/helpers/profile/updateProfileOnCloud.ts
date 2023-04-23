import { UPDATE_PROFILE } from '../../graphql/profile'
import { getHasuraClient } from '../getHasuraClient'
import { stringifyQuery } from '../stringifyQuery'

type UpdateTargets = {
  id: string
  set: {
    calorieTarget?: string | number
    proteinTarget?: string | number
    apiToken?: string
    showCalories?: boolean
    startTime?: string
    hidePWAPrompt?: boolean
    showDensities?: boolean
    countDown?: boolean
    enablePlanning?: boolean
    metricSystem?: boolean
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
