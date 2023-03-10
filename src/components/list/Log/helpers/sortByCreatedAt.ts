import { Food } from '../../../../models/food'
import { Log } from '../../../../models/log'

export const sortByCreatedAt = (items: Food[] | Log[]) =>
  items.sort(
    (itemA, itemB) =>
      Number(new Date(itemB.createdAt)) - Number(new Date(itemA.createdAt))
  )
