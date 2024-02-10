import React from 'react'
import Lightning from '../../../assets/common/lightning.svg'
import { deleteQuickLogOnCloud } from '../../../helpers/quick-log/deleteQuickLogOnCloud'
import { updateQuickLogOnCloud } from '../../../helpers/quick-log/updateQuickLogOnCloud'
import { QuickLog } from '../../../models/quickLog'
import { Item } from '../../item/Item'

export const QuickLogItem: React.FC<{ quick_log: QuickLog }> = (props) => {
  const { quick_log } = props
  const { calories, createdAt, id, name, protein } = quick_log

  const onUpdate = (
    id: string,
    name: string,
    calories: number,
    protein: number
  ): Promise<string | QuickLog> => {
    return new Promise((resolve) => {
      const variables = {
        pk_columns: { id },
        set: { calories, name, protein },
      }
      return updateQuickLogOnCloud(variables, () => {
        resolve('Success!')
      })
    })
  }

  const onDelete = () => {
    deleteQuickLogOnCloud(id, () => {})
  }

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
        name: name || 'Quick Add',
        onDelete,
        onUpdate: onUpdate,
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
