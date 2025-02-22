import type { Unit } from '../../constants/units'
import type { ExerciseCategory } from '../../models/exerciseLog'
import type { Food } from '../../models/food'
import type { Barcode, Log, Meal } from '../../models/log'
import type { Profile } from '../../models/profile'
import type { QuickLog } from '../../models/quickLog'
import type { Recipe } from '../../models/recipe'
import type { Type } from '../../store/data/types'
import type { ExerciseGroup } from '../forms/ExerciseForm/ExerciseForm'

// Essentially, FoodItem, RecipeItem, IngredientItem all have onUpdate methods that are purely synchronous
// For example, on IngredientItem creates an item in the local state
// FoodItem, RecipeItem, and DensityItem actually do nothing. They are null
// Importantly, none of them send a request EXCEPT for LogItem
// Hence, it returns Promise<string | Log>
// And QuickLogItem and ExerciseFormItem do not use the <ItemModal>

export type OnUpdateItem = (
  ...args: any[]
  // biome-ignore lint/suspicious/noConfusingVoidType: Makes TypeScript happy
) => undefined | void | Promise<string | Log> | Promise<string | QuickLog>

export type OnDeleteItem = (id?: string) => void

export type ItemType = Type | 'all'

export type CommonItem = {
  data: any // Escape hatch to hold any extra data in common item
  alias: string | null
  amount: number | null
  barcode: Barcode | null
  basicFood: string | null
  calories: number | null
  category: ExerciseCategory | null
  childRecipe: Recipe | null
  consumed: boolean | null
  createdAt: Date | null
  food: Food | null
  group: ExerciseGroup | null
  id: string
  meal: Meal | null
  name: string
  onDelete: OnDeleteItem | null
  onUpdate: OnUpdateItem | null
  profile: Profile | null
  protein: number | null
  recipe: Recipe | null
  src: string | null
  type: ItemType
  unit: Unit | null
}
