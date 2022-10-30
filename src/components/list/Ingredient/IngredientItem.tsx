import React from 'react'
import { Ingredient } from '../../../models/Ingredient/model'
import { spawnAlert } from '../../alert/helpers/spawnAlert'
import { Item } from '../../item/Item'
import { OnUpdateItem } from '../../item/types'
import { getImagePath, selectFoodImage } from '../helpers/selectFoodImage'

type props = {
  ingredient: Ingredient
  updateIngredient: (ingredient: Ingredient) => void
  deleteIngredient: (id: string) => void
}
export const IngredientItem: React.FC<props> = (props) => {
  const { deleteIngredient, ingredient } = props
  const { amount, createdAt, id, type, unit } = ingredient
  const food = ingredient.ingredientToFood
  const childRecipe = ingredient.ingredientToChildRecipe

  const onUpdate: OnUpdateItem = (id, unit, amount, dispatch) => {
    if (!unit) {
      spawnAlert('Please specify a unit', 'danger')
    } else if (!amount) {
      spawnAlert('Please specify a valid amount', 'danger')
    } else {
      const updatedIngredient = { ...ingredient, amount, unit }
      dispatch('saveIngredient', updatedIngredient)
    }
  }

  const src = selectFoodImage(food || childRecipe, getImagePath)
  const name = food?.name || childRecipe?.name || ''

  const onDelete = (id: string | undefined) => {
    if (id) {
      deleteIngredient(id)
    }
  }

  return (
    <Item
      item={{
        alias: null,
        amount,
        barcode: null,
        childRecipe,
        createdAt,
        food,
        id,
        name,
        onDelete,
        onUpdate,
        profile: ingredient.ingredientToProfile,
        recipe: null,
        src,
        type,
        unit,
      }}
    />
  )
}
