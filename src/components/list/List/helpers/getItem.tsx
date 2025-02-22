import type { Food } from '../../../../models/food'
import type { Ingredient } from '../../../../models/ingredient'
import type { Recipe } from '../../../../models/recipe'
import { FoodItem } from '../../Food/FoodItem'
import { IngredientItem } from '../../Ingredient/IngredientItem'
import { RecipeItem } from '../../Recipe/RecipeItem'
import type { Item } from '../List'
import type { PaginatedListPurpose } from '../types'

export const getItem = (
  item: Item,
  updateItem: null | ((item: any) => void),
  deleteItem: null | ((id: string) => void),
  purpose: PaginatedListPurpose
) => {
  if (item.type === 'recipe') {
    return <RecipeItem recipe={item as Recipe} />
  }
  if (item.type === 'food' && purpose === 'food-list') {
    return <FoodItem food={item as Food} />
  }
  if (item.type === 'ingredient' && deleteItem && updateItem) {
    return (
      <IngredientItem
        deleteIngredient={deleteItem}
        updateIngredient={updateItem}
        ingredient={item as Ingredient}
      />
    )
  }
  throw Error(`Error: PaginatedList: ${JSON.stringify({ item })}`)
}
