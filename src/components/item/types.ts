import { Unit } from '../../constants/units'
import { Food } from '../../models/food'
import { Barcode, Log, Meal } from '../../models/log'
import { Profile } from '../../models/profile'
import { Recipe } from '../../models/recipe'
import { Type } from '../../store/data/types'
import { AllEvents } from '../../store/store'
import { Dispatch } from '../../store/types'

// Essentially, FoodItem, RecipeItem, IngredientItem all have onUpdate methods that are purely synchronous
// For example, on IngredientItem creates an item in the local state
// FoodItem, RecipeItem, and DensityItem actually do nothing. They are null
// Importantly, none of them send a request EXCEPT for LogItem, which does.
// Hence, it returns that Promise<string | Log>
export type OnUpdateItem = (
  id: string,
  unit: Unit | null,
  amount: number | null,
  consumed: boolean | null,
  meal: Meal | null,
  dispatch: Dispatch<AllEvents>,
  barcode?: Barcode | null
) => void | Promise<string | Log>

export type OnDeleteItem = (id?: string) => void

export type ItemType = Type | 'all'

export type CommonItem = {
  alias: string | null
  amount: number | null
  barcode: Barcode | null
  basicFood: string | null
  calories: number | null
  childRecipe: Recipe | null
  consumed: boolean | null
  createdAt: Date | null
  food: Food | null
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
