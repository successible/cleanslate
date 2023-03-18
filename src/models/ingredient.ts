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
  basicFood = uuid() || null
  childRecipe = uuid() || null
  food = uuid() || null
  profile: string
  recipe = uuid()

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
