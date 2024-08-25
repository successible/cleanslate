import { curry } from 'lodash-es'
import { Unit } from '../../../constants/units'
import { Food } from '../../../models/food'
import { Recipe } from '../../../models/recipe'
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
      ></Select>
    )
  } else {
    return <div />
  }
}
