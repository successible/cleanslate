import React from 'react'
import { deleteLogOnCloud } from '../../../models/Log/helpers/deleteLogOnCloud'
import { updateLogOnCloud } from '../../../models/Log/helpers/updateLogOnCloud'
import { Log } from '../../../models/Log/model'
import { Unit } from '../../../models/Log/types'
import { spawnAlert } from '../../alert/helpers/spawnAlert'
import { Item } from '../../item/Item'
import { getImagePath, selectFoodImage } from '../helpers/selectFoodImage'

export const logOrIngredientUpdateError = [
  'Please specify a unit',
  ' Please specify a valid amount',
] as const
export type LogOrIngredientUpdateError = typeof logOrIngredientUpdateError

export const LogItem: React.FC<{
  log: Log
  renderUnit: boolean
}> = (props) => {
  const { log } = props
  const { alias, amount, createdAt, id, type, unit } = log
  const food = log.logToFood
  const recipe = log.logToRecipe

  const onUpdate = (
    id: string,
    unit: Unit | null,
    amount: number | null
  ): Promise<string | Log> => {
    return new Promise((resolve, reject) => {
      if (!unit) {
        const message = logOrIngredientUpdateError[0]
        spawnAlert(message, 'danger')
        reject(message)
      } else if (!amount) {
        const message = logOrIngredientUpdateError[1]
        spawnAlert(message, 'danger', () => {}, null)
        reject(message)
      } else {
        const variables = { pk_columns: { id }, set: { amount, unit } }
        return updateLogOnCloud(variables, () => {
          resolve('Success!')
        })
      }
    })
  }

  const onDelete = () => {
    deleteLogOnCloud(id, () => {})
  }

  const src = selectFoodImage(food || recipe, getImagePath)
  const name = recipe?.name || food?.name || ''

  return (
    <Item
      item={{
        alias,
        amount,
        childRecipe: null,
        createdAt,
        food,
        id,
        name,
        onDelete,
        onUpdate,
        profile: null,
        recipe,
        src,
        type,
        unit,
      }}
    />
  )
}
