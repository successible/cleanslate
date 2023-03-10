import React from 'react'
import { useStoreon } from 'storeon/react'
import { quickAddUnits } from '../../../constants/units'
import { deleteLogsOnCloud } from '../../../helpers/log/deleteLogsOnCloud'
import { Log } from '../../../models/log'
import { Data } from '../../../store/data/types'
import { Item } from '../../item/Item'
import { formatUnitAsTitle } from '../helpers/formatUnitAsTitle'
import { selectUnitImage } from '../helpers/selectUnitImage'

export const UnitItem: React.FC<{ log: Log }> = (props) => {
  const { log } = props
  const { amount, createdAt, id, unit } = log

  const { data }: { data: Data } = useStoreon('data')

  const logs = data.profiles[0].logs

  const onDelete = () => {
    // When trying to delete a quick add unit, find ALL quick add units corresponding to the unit
    // For example, find all CALORIE logs
    // Then delete all of them
    if (quickAddUnits.includes(unit)) {
      const logsToDelete = logs
        .filter((log) => log.unit === unit)
        .map((log) => log.id)
      deleteLogsOnCloud(logsToDelete, () => {})
    }
  }

  const name = `Quick Add: ${formatUnitAsTitle(unit)}`
  const src = selectUnitImage(unit)

  return (
    <Item
      item={{
        alias: null,
        amount,
        barcode: null,
        childRecipe: null,
        createdAt,
        food: null,
        id,
        name,
        onDelete,
        onUpdate: null,
        profile: null,
        recipe: null,
        src,
        type: 'unit',
        unit,
      }}
    />
  )
}
