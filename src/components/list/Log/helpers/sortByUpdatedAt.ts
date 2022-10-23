import { Food } from '../../../../models/Food/model'
import { Log } from '../../../../models/Log/model'

export const sortByUpdatedAt = (items: Food[] | Log[]) =>
  items.sort(
    (itemA, itemB) =>
      Number(new Date(itemB.updatedAt)) - Number(new Date(itemA.updatedAt))
  )
