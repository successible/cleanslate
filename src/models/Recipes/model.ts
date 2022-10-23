import { uuid } from '../../helpers/data/uuid'
import { Density } from '../Food/model'
import { Ingredient } from '../Ingredient/model'
import { Log } from '../Log/model'
import { Profile } from '../Profile/model'

// Called recipes in Hasura
export class Recipe {
  // Data
  name: string
  countName: string | null
  containerName: string | null
  servingPerContainer: number | null

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
