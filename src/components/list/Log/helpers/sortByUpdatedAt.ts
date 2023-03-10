import { Food } from '../../../../models/food'
import { Log } from '../../../../models/log'

export const sortByUpdatedAt = (items: Food[] | Log[]) =>
  items.sort(
    (itemA, itemB) =>
      Number(new Date(itemB.updatedAt)) - Number(new Date(itemA.updatedAt))
  )
