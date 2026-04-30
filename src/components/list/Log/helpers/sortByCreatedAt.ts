import type { ExerciseLog } from '../../../../models/exerciseLog'
import type { Food } from '../../../../models/food'
import type { Log } from '../../../../models/log'
import type { QuickLog } from '../../../../models/quickLog'
import type { WaterLog } from '../../../../models/waterLog'

export const sortByCreatedAt = (
  items: Food[] | Log[] | QuickLog[] | ExerciseLog[] | WaterLog[]
) =>
  (items || []).sort(
    (itemA, itemB) =>
      Number(new Date(itemB.createdAt)) - Number(new Date(itemA.createdAt))
  )
