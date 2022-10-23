import { curry } from '@typed/curry'
import React from 'react'
import { Food } from '../../../models/Food/model'
import { Unit } from '../../../models/Log/types'
import { Recipe } from '../../../models/Recipes/model'
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
    console.error('Something went wrong with renderUnitComponent')
    return <div />
  }
}
