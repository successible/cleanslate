import { uuid } from '../helpers/uuid'
import { Density } from './food'
import { Ingredient } from './ingredient'
import { Log } from './log'
import { Profile } from './profile'

// Called recipes in Hasura
export class Recipe {
  // Data
  name: string
  countName: string | null
  containerName: string | null
  servingPerContainer: number | null
  countToGram: number | null
  countToTbsp: number | null

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
