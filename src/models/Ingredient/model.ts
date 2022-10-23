import { uuid } from '../../helpers/data/uuid'
import { Food } from '../Food/model'
import { Unit } from '../Log/types'
import { Profile } from '../Profile/model'
import { Recipe } from '../Recipes/model'

// Called ingredients in Hasura
export class Ingredient {
  // Data
  amount: number
  unit: Unit

  // Foreign keys
  profile: string
  recipe = uuid()
  food = uuid() || null
  childRecipe = uuid() || null

  // Relationships
  ingredientToFood: Food | null
  ingredientToRecipe: Recipe
  ingredientToChildRecipe: Recipe | null
  ingredientToProfile: Profile

  // Metadata
  id = uuid()
  updatedAt = new Date()
  createdAt = new Date()
  type: 'ingredient'

  constructor() {
    this.type = 'ingredient'
  }
}
