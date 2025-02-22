import type React from 'react'
import { deleteRecipeOnCloud } from '../../../helpers/recipes/deleteRecipeOnCloud'
import type { Recipe } from '../../../models/recipe'
import { Item } from '../../item/Item'

export const RecipeItem: React.FC<{ recipe: Recipe }> = (props) => {
  const { recipe } = props
  const { createdAt, id, name, type } = recipe

  const onDelete = () => {
    deleteRecipeOnCloud(id, () => {})
  }

  return (
    <Item
      item={{
        alias: null,
        amount: null,
        barcode: null,
        basicFood: null,
        calories: null,
        category: null,
        childRecipe: null,
        consumed: null,
        createdAt,
        data: recipe,
        food: null,
        group: null,
        id,
        meal: null,
        name,
        onDelete,
        onUpdate: null,
        profile: recipe.recipeToProfile,
        protein: null,
        recipe: null,
        src: null,
        type,
        unit: null,
      }}
    />
  )
}
