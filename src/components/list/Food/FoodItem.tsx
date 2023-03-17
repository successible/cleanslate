import React from 'react'
import { deleteFoodOnCloud } from '../../../helpers/Food/deleteFoodOnCloud'
import { Food } from '../../../models/food'
import { Item } from '../../item/Item'

export const FoodItem: React.FC<{ food: Food }> = (props) => {
  const { food } = props
  const { createdAt, foodToProfile, id, name, type } = food

  const onDelete = () => {
    deleteFoodOnCloud(id, () => {})
  }

  return (
    <Item
      item={{
        alias: null,
        amount: null,
        barcode: null,
        childRecipe: null,
        consumed: null,
        createdAt,
        food: null,
        id,
        meal: null,
        name,
        onDelete,
        onUpdate: null,
        profile: foodToProfile,
        recipe: null,
        src: null,
        type,
        unit: null,
      }}
    />
  )
}
