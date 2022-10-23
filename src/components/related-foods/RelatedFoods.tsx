import React from 'react'
import { Food } from '../../models/Food/model'
import { Recipe } from '../../models/Recipes/model'
import { List } from './List'

type props = {
  dummyFood: Food | Recipe
  foods: Food[]
  onSuccess: (food: Food) => void
  searchText: string
}

export const RelatedFoods: React.FC<props> = ({
  dummyFood,
  foods,
  onSuccess,
  searchText,
}) => {
  return (
    <div className="w100">
      <List
        foods={foods}
        onSuccess={onSuccess}
        dummyFood={dummyFood}
        searchText={searchText}
      />
    </div>
  )
}
