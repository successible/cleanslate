import { Food } from '../../models/Food/model'
import { Barcode, Log } from '../../models/Log/model'
import { Unit } from '../../models/Log/types'
import { Profile } from '../../models/Profile/model'
import { Recipe } from '../../models/Recipes/model'
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
  dispatch: Dispatch<AllEvents>
) => void | Promise<string | Log>

export type OnDeleteItem = (id?: string) => void

export type ItemType = Type | 'all'

export type CommonItem = {
  alias: string | null
  amount: number | null
  barcode: Barcode | null
  childRecipe: Recipe | null
  createdAt: Date | null
  food: Food | null
  id: string
  name: string
  onDelete: OnDeleteItem | null
  onUpdate: OnUpdateItem | null
  profile: Profile | null
  recipe: Recipe | null
  src: string | null
  type: ItemType
  unit: Unit | null
}
