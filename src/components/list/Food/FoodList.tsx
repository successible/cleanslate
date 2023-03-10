import React from 'react'
import { Food } from '../../../models/food'
import { List } from '../List/List'

type props = {
  foods: Food[]
}

export const FoodList: React.FC<props> = ({ foods }) => {
  const customFoods = foods
    .filter((food) => food.foodToProfile?.authId)
    .sort((a, b) => a.name.localeCompare(b.name))
  return (
    <List
      purpose="food-list"
      items={customFoods}
      searchable={true}
      paginate={true}
      updateItem={null}
      deleteItem={null}
    />
  )
}
