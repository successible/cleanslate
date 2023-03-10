import { Category } from '../constants/categories'
import { Group } from '../constants/groups'
import { VolumeUnit, WeightUnit } from '../constants/units'
import { uuid } from '../helpers/uuid'
import { Ingredient } from './ingredient'
import { Log } from './log'
import { Profile } from './profile'

export type Density = 'caloric-density' | 'protein-density' | 'combined-density'

// Called foods in Hasura
export class Food {
  // Data
  name: string
  group: Group
  category: Category
  alias: string | null
  countName: string | null
  containerName: string | null
  caloriesPerGram: number | null
  proteinPerGram: number | null
  caloriesPerCount: number | null
  proteinPerCount: number | null
  countToGram: number | null
  countToTbsp: number | null
  tbspToGram: number | null
  servingPerContainer: number | null
  preferredVolumeUnit: VolumeUnit | null
  preferredWeightUnit: WeightUnit | null

  // Foreign keys
  profile: string | null
  basicFoodId = uuid() || null

  // Relationships
  foodToProfile: Profile | null
  ingredients: Ingredient[]
  logs: Log[]

  // Metadata
  id = uuid()
  updatedAt = new Date()
  createdAt = new Date()
  type: 'food'

  // Added at runtime
  isDummy: undefined | boolean // For searchbar
  density: Density // For AllFoodItem

  constructor() {
    this.name = 'Chicken'
    this.group = 'Protein'
    this.category = 'Chicken'
    this.type = 'food'
    this.isDummy = false
  }
}
