import { Food } from '../../../../models/Food/model'
import { Log } from '../../../../models/Log/model'

export const sortByCreatedAt = (items: Food[] | Log[]) =>
  items.sort(
    (itemA, itemB) =>
      Number(new Date(itemB.createdAt)) - Number(new Date(itemA.createdAt))
  )
