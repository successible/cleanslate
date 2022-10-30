import { getHasuraClient } from '../../../helpers/data/getHasuraClient'
import { stringifyQuery } from '../../../helpers/data/stringifyQuery'
import { UPDATE_PROFILE } from '../schema'

type UpdateTargets = {
  id: string
  set: {
    calorieTarget?: number | React.ReactText
    proteinTarget?: number | React.ReactText
    apiToken?: string
    showCalories?: boolean
    startTime?: string
    hidePWAPrompt?: boolean
    showDensities?: string
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
