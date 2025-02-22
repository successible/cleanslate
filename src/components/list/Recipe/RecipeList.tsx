import type React from 'react'
import type { Recipe } from '../../../models/recipe'
import { List } from '../List/List'

type props = {
  recipes: Recipe[]
}

export const RecipeList: React.FC<props> = ({ recipes }) => {
  const recipesToUse = recipes.sort((a, b) => a.name.localeCompare(b.name))
  return (
    <List
      purpose="recipe-list"
      items={recipesToUse}
      searchable={true}
      paginate={true}
      updateItem={null}
      deleteItem={null}
    />
  )
}
