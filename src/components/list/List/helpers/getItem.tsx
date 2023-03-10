import { Food } from '../../../../models/food'
import { Ingredient } from '../../../../models/ingredient'
import { Recipe } from '../../../../models/recipe'
import { FoodItem } from '../../Food/FoodItem'
import { IngredientItem } from '../../Ingredient/IngredientItem'
import { RecipeItem } from '../../Recipe/RecipeItem'
import { Item } from '../List'
import { PaginatedListPurpose } from '../types'

export const getItem = (
  item: Item,
  updateItem: null | ((item: any) => void),
  deleteItem: null | ((id: string) => void),
  purpose: PaginatedListPurpose
) => {
  if (item.type === 'recipe') {
    return <RecipeItem recipe={item as Recipe} />
  } else if (item.type === 'food' && purpose === 'food-list') {
    return <FoodItem food={item as Food} />
  } else if (item.type === 'ingredient' && deleteItem && updateItem) {
    return (
      <IngredientItem
        deleteIngredient={deleteItem}
        updateIngredient={updateItem}
        ingredient={item as Ingredient}
      />
    )
  } else {
    throw Error(`Error: PaginatedList: ${JSON.stringify({ item })}`)
  }
}
