import { uuid } from '../../helpers/data/uuid'
import { Food } from '../Food/model'
import { Ingredient } from '../Ingredient/model'
import { Log } from '../Log/model'
import { Recipe } from '../Recipes/model'

// The default targets are ludicrous by design
// That is how progress bars will know to show the placeholder
export const defaultTargets = [100000, 100000]
export const defaultStartTime = '00:00:00'

export class Profile {
  // Data
  calorieTarget: number // Default 2000
  proteinTarget: number // Default 150
  showCalories: boolean // Default to True
  startTime: string
  apiToken = uuid()
  timezone: string
  showDensities: boolean // Default to false
  hidePWAPrompt: boolean // Default to false

  // Relationships
  foods: Food[]
  logs: Log[]
  recipes: Recipe[]
  ingredients: Ingredient[]

  // Foreign keys
  authId = uuid()

  // Metadata
  id = uuid()
  updatedAt = new Date()
  createdAt = new Date()
  type: 'profile'

  constructor() {
    this.foods = [] as Food[]
    this.recipes = [] as Recipe[]
    this.logs = [] as Log[]
    this.ingredients = [] as Ingredient[]
    this.calorieTarget = defaultTargets[0]
    this.proteinTarget = defaultTargets[1]
    this.startTime = defaultStartTime
    // We do not want to accidentally show the PWAPrompt if fetching data fails
    this.hidePWAPrompt = true
  }
}
