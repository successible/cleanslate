import { ExerciseLog } from '../../../../models/exerciseLog'
import { Food } from '../../../../models/food'
import { Log } from '../../../../models/log'
import { QuickLog } from '../../../../models/quickLog'

export const sortByCreatedAt = (
  items: Food[] | Log[] | QuickLog[] | ExerciseLog[]
) =>
  (items || []).sort(
    (itemA, itemB) =>
      Number(new Date(itemB.createdAt)) - Number(new Date(itemA.createdAt))
  )
