import type React from 'react'
import Wave from '../../../assets/common/wave.svg'
import { deleteWaterLogOnCloud } from '../../../helpers/water-log/deleteWaterLogOnCloud'
import type { WaterLog } from '../../../models/waterLog'
import { Item } from '../../item/Item'

export const WaterLogItem: React.FC<{ water_log: WaterLog }> = (props) => {
  const { water_log } = props
  const { amount, createdAt, id, unit } = water_log

  const onUpdate = () => {}
  const onDelete = () => {
    deleteWaterLogOnCloud(id, () => {})
  }

  const src = Wave.src

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
        data: water_log,
        food: null,
        group: null,
        id,
        meal: null,
        name: `${amount} ${unit}`,
        onDelete,
        onUpdate: onUpdate,
        profile: null,
        protein: null,
        recipe: null,
        src,
        type: 'water-log',
        unit: null,
      }}
    />
  )
}
