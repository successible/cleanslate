import {
  LiftingActivity,
  liftingMET,
  OtherActivity,
  otherMet,
  SwimmingActivity,
  swimmingMET,
} from '../constants'
import { ExerciseGroup } from '../ExerciseForm'
import { getCyclingMET } from './getCyclingMET'
import { getRowingMET } from './getRowingMET'
import { getRunningMET } from './getRunningMET'
import { getWalkingMET } from './getWalkingMET'

export const getMETsFromInput = (
  exerciseGroup: ExerciseGroup,
  otherActivity: OtherActivity,
  swimmingActivity: SwimmingActivity,
  liftingActivity: LiftingActivity,
  mph: number,
  incline: number,
  watts: number
): number => {
  if (exerciseGroup === 'Cycling') {
    return getCyclingMET(mph)
  } else if (exerciseGroup === 'Running') {
    return getRunningMET(mph)
  } else if (exerciseGroup === 'Walking') {
    return getWalkingMET(mph, incline)
  } else if (exerciseGroup === 'Rowing') {
    return getRowingMET(watts)
  } else if (exerciseGroup === 'Other') {
    return otherMet[otherActivity]
  } else if (exerciseGroup === 'Swimming') {
    return swimmingMET[swimmingActivity]
  } else if (exerciseGroup === 'Lifting') {
    return liftingMET[liftingActivity]
  } else if (exerciseGroup === 'Custom') {
    return 0 // Dummy value
  } else {
    throw Error(
      `Error: getMETsFromInput: ${JSON.stringify({
        exerciseGroup,
        incline,
        liftingActivity,
        mph,
        otherActivity,
        swimmingActivity,
        watts,
      })}`
    )
  }
}
