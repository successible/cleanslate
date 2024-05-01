import type { Unit } from '../constants/units'
import { uuid } from '../helpers/uuid'
import type { Food } from './food'
import type { Profile } from './profile'
import type { Recipe } from './recipe'

export type Meal = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'

export const defaultMeal: Meal = 'Snack'
export const MealEnum: Record<Meal, number> = {
  Breakfast: 0,
  Lunch: 1,
  Dinner: 2,
  Snack: 3,
}

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
  consumed: boolean
  meal: Meal

  // Foreign keys
  basicFood = uuid() || null
  food = uuid() || null
  profile: string
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
