import React from 'react'
import toast from 'react-hot-toast'
import BarcodeWithoutScanner from '../../../assets/common/barcode-without-scanner.svg'
import { Ingredient } from '../../../models/ingredient'
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
  const { amount, barcode, createdAt, id, type, unit } = ingredient
  const food = ingredient.ingredientToFood
  const childRecipe = ingredient.ingredientToChildRecipe

  const onUpdate: OnUpdateItem = (
    id,
    unit,
    amount,
    consumed,
    meal,
    dispatch
  ) => {
    if (!unit) {
      toast.error('Please specify a unit')
    } else if (!amount) {
      toast.error('Please specify a valid amount')
    } else {
      const updatedIngredient = { ...ingredient, amount, consumed, meal, unit }
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
        barcode,
        basicFood: ingredient.basicFood,
        calories: null,
        childRecipe,
        consumed: null,
        createdAt,
        food,
        id,
        meal: null,
        name,
        onDelete,
        onUpdate,
        profile: ingredient.ingredientToProfile,
        protein: null,
        recipe: null,
        src: barcode ? BarcodeWithoutScanner.src : src,
        type,
        unit,
      }}
    />
  )
}
