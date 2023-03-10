import { Unit } from '../constants/units'
import { uuid } from '../helpers/uuid'
import { Food } from './food'
import { Profile } from './profile'
import { Recipe } from './recipe'

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
