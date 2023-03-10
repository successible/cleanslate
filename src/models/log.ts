import { Unit } from '../constants/units'
import { uuid } from '../helpers/uuid'
import { Food } from './food'
import { Profile } from './profile'
import { Recipe } from './recipe'

export type Barcode = {
  name: string
  code: string
  calories_per_gram: number
  protein_per_gram: number
  calories_per_serving: number
  protein_per_serving: number
  serving_size: number // "2 Tbsp (30 g)"
  serving_quantity: string // 30
}

export class Log {
  // Data
  amount: number
  unit: Unit
  alias: string | null
  barcode: Barcode | null

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
