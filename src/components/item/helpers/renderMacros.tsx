import React from 'react'
import { Log } from '../../../models/Log/model'
import { Macros } from '../../macros/Macros'
import { CommonItem } from '../types'

export const renderMacros = (item: CommonItem): JSX.Element => {
  if (item.type === 'log' || item.type === 'ingredient') {
    const log = new Log()
    log.logToFood = item.food
    log.logToRecipe = item.recipe
    log.logToProfile = null
    // These will never be default, but Typescript doesn't believe us :)
    // Hence, 0 and COUNT are dummy values
    log.amount = item.amount || 0
    log.unit = item.unit || 'COUNT'

    return <Macros log={log} showDensities={false} />
  } else {
    return <div>{''}</div>
  }
}
