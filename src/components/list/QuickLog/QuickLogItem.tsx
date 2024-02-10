import React from 'react'
import Lightning from '../../../assets/common/lightning.svg'
import { QuickLog } from '../../../models/quickLog'
import { Item } from '../../item/Item'

export const UnitItem: React.FC<{ quick_log: QuickLog }> = (props) => {
  const { quick_log } = props
  const { calories, createdAt, id, name, protein } = quick_log

  const onDelete = () => {}

  const src = Lightning.src

  return (
    <Item
      item={{
        alias: null,
        amount: null,
        barcode: null,
        basicFood: null,
        calories,
        childRecipe: null,
        consumed: null,
        createdAt,
        food: null,
        id,
        meal: null,
        name: name || '',
        onDelete,
        onUpdate: null,
        profile: null,
        protein,
        recipe: null,
        src,
        type: 'quick-log',
        unit: null,
      }}
    />
  )
}
