import type React from 'react'
import { deleteFoodOnCloud } from '../../../helpers/Food/deleteFoodOnCloud'
import type { Food } from '../../../models/food'
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
        basicFood: null,
        calories: null,
        category: null,
        childRecipe: null,
        consumed: null,
        createdAt,
        data: food,
        food: null,
        group: null,
        id,
        meal: null,
        name,
        onDelete,
        onUpdate: null,
        profile: foodToProfile,
        protein: null,
        recipe: null,
        src: null,
        type,
        unit: null,
      }}
    />
  )
}
