import { uuid } from '../helpers/uuid'
import type { Meal } from './log'
import type { Profile } from './profile'

export class QuickLog {
  calories: number
  consumed: boolean
  meal: Meal
  name?: string
  protein: number

  // Foreign keys
  profile: string

  // Relationships
  quickLogToProfile: Profile | null

  // Metadata
  id = uuid()
  updatedAt = new Date()
  createdAt = new Date()
  type: 'quick-log'

  constructor() {
    this.quickLogToProfile = null
    this.type = 'quick-log'
  }
}
