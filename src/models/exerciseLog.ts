/* eslint-disable sort/object-properties */

import type { ExerciseGroup } from '../components/forms/ExerciseForm/ExerciseForm'
import type {
  LiftingActivity,
  OtherActivity,
  SwimmingActivity,
} from '../components/forms/ExerciseForm/constants'
import { uuid } from '../helpers/uuid'
import type { Profile } from './profile'

export type ExerciseCategory =
  | (OtherActivity | SwimmingActivity | LiftingActivity)
  | null

export type ExerciseData = {
  amount: number
  category: ExerciseCategory | null
  duration: number | null
  groupName: ExerciseGroup
  incline: number | null
  name: string
  pace: number | null
  power: number | null
  weight: number | null
}

export class ExerciseLog {
  amount: number
  category: ExerciseCategory | null
  duration: number | null
  groupName: ExerciseGroup
  incline: number | null
  name: string
  pace: number | null
  power: number | null
  weight: number | null

  // Foreign keys
  profile: string

  // Relationships
  exerciseLogToProfile: Profile | null

  // Metadata
  id = uuid()
  updatedAt = new Date()
  createdAt = new Date()
  type: 'exercise-log'

  constructor() {
    this.exerciseLogToProfile = null
    this.type = 'exercise-log'
  }
}
