import type React from 'react'
import type { Ingredient } from '../../../models/ingredient'
import type { Recipe } from '../../../models/recipe'
import { List } from '../List/List'

type props = {
  recipe: Recipe | null
  ingredients: Ingredient[]
  updateIngredient: (ingredient: Ingredient) => void
  deleteIngredient: (id: string) => void
}

export const IngredientList: React.FC<props> = ({
  deleteIngredient,
  ingredients,
  recipe,
  updateIngredient,
}) => {
  const ingredientsToUse = ingredients
    // Add the parent recipe, just in case
    .map((a) => {
      return { ...a, ingredientToRecipe: recipe }
    })
    .sort((a, b) => {
      const nameA =
        a?.ingredientToFood?.name || a?.ingredientToChildRecipe?.name || a.unit
      const nameB =
        b?.ingredientToFood?.name || b?.ingredientToChildRecipe?.name || b.unit
      return nameA.localeCompare(nameB)
    })

  return (
    <List
      purpose="ingredient-list"
      items={ingredientsToUse}
      searchable={false}
      paginate={false}
      updateItem={updateIngredient}
      deleteItem={deleteIngredient}
    />
  )
}
