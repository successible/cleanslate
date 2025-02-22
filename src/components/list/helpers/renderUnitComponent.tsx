import { curry } from 'lodash-es'
import type { Unit } from '../../../constants/units'
import type { Food } from '../../../models/food'
import type { Recipe } from '../../../models/recipe'
import { Select } from '../../select/Select'
import { getPrettyUnits } from './getPrettyUnits'

export const renderUnitComponent = (
  id: string,
  unit: Unit,
  item: Food | Recipe | null | undefined,
  updater: (id: string, unit: Unit) => void
) => {
  if (item) {
    const prettyUnits = getPrettyUnits(item)
    return (
      <Select
        focus={false}
        currentOption={unit}
        optionDictionary={prettyUnits}
        onChange={curry(updater)(id)}
      />
    )
  }
  return <div />
}
