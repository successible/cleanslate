import { Log } from '../../../models/Log/model'
import { Profile } from '../../../models/Profile/model'
import { Macros } from '../../macros/Macros'
import { CommonItem } from '../types'

export const renderMacros = (
  item: CommonItem,
  profile: Profile
): JSX.Element => {
  if (item.type === 'log' || item.type === 'ingredient') {
    const log = new Log()
    log.logToFood = item.food
    log.logToRecipe = item.recipe
    log.logToProfile = null
    // These will never be default, but Typescript doesn't believe us :)
    // Hence, 0 and COUNT are dummy values
    log.amount = item.amount || 0
    log.unit = item.unit || 'COUNT'
    log.barcode = item.barcode

    return <Macros log={log} profile={profile} />
  } else {
    return <div>{''}</div>
  }
}
