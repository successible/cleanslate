import { Log } from '../../../models/log'
import { Profile } from '../../../models/profile'
import { Macros } from '../../macros/Macros'
import { CommonItem } from '../types'

export const renderMacros = (
  item: CommonItem,
  profile: Profile
): React.ReactNode => {
  if (item.type === 'log' || item.type === 'ingredient') {
    const log = new Log()
    log.logToFood = item.food
    log.logToRecipe = item.recipe || item.childRecipe
    log.logToProfile = null
    log.amount = item.amount || 0
    log.unit = item.unit || 'COUNT'
    log.barcode = item.barcode

    return <Macros log={log} profile={profile} showTitles={false} />
  } else {
    return <div>{''}</div>
  }
}
