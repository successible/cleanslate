import { uuid } from '../../helpers/data/uuid'
import { Food } from '../Food/model'
import { Profile } from '../Profile/model'
import { Recipe } from '../Recipes/model'
import { Unit } from './types'

export class Log {
  // Data
  amount: number
  unit: Unit
  alias: string | null

  // Foreign keys
  profile: string
  food = uuid() || null
  recipe = uuid() || null

  // Relationships
  logToFood: Food | null
  logToRecipe: Recipe | null
  logToProfile: Profile | null

  // Metadata
  id = uuid()
  updatedAt = new Date()
  createdAt = new Date()
  type: 'log'

  constructor() {
    this.logToFood = null
    this.logToRecipe = null
    this.logToProfile = null
    this.type = 'log'
  }
}
