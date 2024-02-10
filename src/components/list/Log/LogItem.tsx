import React from 'react'
import toast from 'react-hot-toast'
import BarcodeWithoutScanner from '../../../assets/common/barcode-without-scanner.svg'
import { Unit } from '../../../constants/units'
import { deleteLogOnCloud } from '../../../helpers/log/deleteLogOnCloud'
import { updateLogOnCloud } from '../../../helpers/log/updateLogOnCloud'
import { Log, Meal } from '../../../models/log'
import { Profile } from '../../../models/profile'
import { Item } from '../../item/Item'
import { getImagePath, selectFoodImage } from '../helpers/selectFoodImage'

export const logOrIngredientUpdateError = [
  'Please specify a unit',
  ' Please specify a valid amount',
] as const
export type LogOrIngredientUpdateError = typeof logOrIngredientUpdateError

export const LogItem: React.FC<{
  log: Log
  profile: Profile
  renderUnit: boolean
}> = (props) => {
  const { log, profile } = props
  const { alias, amount, barcode, consumed, createdAt, id, meal, type, unit } =
    log
  const food = log.logToFood
  const recipe = log.logToRecipe

  const onUpdate = (
    id: string,
    unit: Unit | null,
    amount: number | null,
    consumed: boolean | null,
    meal: Meal | null
  ): Promise<string | Log> => {
    return new Promise((resolve, reject) => {
      if (consumed === null) {
        toast.error('Please mark the log as consumed or not')
        reject('Please mark the log as consumed or not')
      } else if (!unit) {
        const message = logOrIngredientUpdateError[0]
        toast.error(message)
        reject(message)
      } else if (!amount) {
        const message = logOrIngredientUpdateError[1]
        toast.error(message)
        reject(message)
      } else {
        const variables = {
          pk_columns: { id },
          set: { amount, consumed, meal, unit },
        }
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
        barcode,
        basicFood: log.basicFood,
        calories: null,
        childRecipe: null,
        consumed,
        createdAt,
        food,
        id,
        meal,
        name,
        onDelete,
        onUpdate,
        profile,
        protein: null,
        recipe,
        src: barcode ? BarcodeWithoutScanner.src : src,
        type,
        unit,
      }}
    />
  )
}
