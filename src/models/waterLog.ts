import { uuid } from '../helpers/uuid'
import type { Profile } from './profile'

export class WaterLog {
  amount: number
  unit: 'mL' | 'oz'

  // Foreign keys
  profile: string

  // Relationships
  waterLogToProfile: Profile | null

  // Metadata
  id = uuid()
  updatedAt = new Date()
  createdAt = new Date()
  type: 'water-log'

  constructor() {
    this.waterLogToProfile = null
    this.type = 'water-log'
  }
}
