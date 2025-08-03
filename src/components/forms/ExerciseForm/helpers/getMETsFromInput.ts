import {
  type LiftingActivity,
  liftingMET,
  type OtherActivity,
  otherMet,
  type SwimmingActivity,
  swimmingMET,
} from '../constants'
import type { ExerciseGroup } from '../ExerciseForm'
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
  }
  if (exerciseGroup === 'Running') {
    return getRunningMET(mph)
  }
  if (exerciseGroup === 'Walking') {
    return getWalkingMET(mph, incline)
  }
  if (exerciseGroup === 'Rowing') {
    return getRowingMET(watts)
  }
  if (exerciseGroup === 'Other') {
    return otherMet[otherActivity]
  }
  if (exerciseGroup === 'Swimming') {
    return swimmingMET[swimmingActivity]
  }
  if (exerciseGroup === 'Lifting') {
    return liftingMET[liftingActivity]
  }
  if (exerciseGroup === 'Custom') {
    return 0 // Dummy value
  }
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
