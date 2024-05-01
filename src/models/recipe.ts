import type { VolumeUnit, WeightUnit } from '../constants/units'
import { uuid } from '../helpers/uuid'
import type { Density } from './food'
import type { Ingredient } from './ingredient'
import type { Log } from './log'
import type { Profile } from './profile'

// Called recipes in Hasura
export class Recipe {
  // Data
  name: string
  countName: string | null
  containerName: string | null
  servingPerContainer: number | null
  countToGram: number | null
  countToTbsp: number | null
  preferredVolumeUnit: VolumeUnit | null
  preferredWeightUnit: WeightUnit | null

  // Foreign keys
  profile: string

  // Relationships
  ingredients: Ingredient[]
  ingredientsOfChildRecipe: Ingredient[]
  logs: Log[]
  recipeToProfile: Profile

  // Metadata
  id = uuid()
  updatedAt = new Date()
  createdAt = new Date()
  type: 'recipe'

  // Runtime
  isDummy: undefined // For searchbar
  density: Density // For AllFoodItem
  alias: string | null // For dynamically created DummyFoods, like Pasta

  constructor() {
    this.type = 'recipe'
    this.ingredients = [] as Ingredient[]
  }
}
