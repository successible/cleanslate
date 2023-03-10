import { QuickAddUnit } from '../../../constants/units'
import { addQuickLogToCloud } from '../../../helpers/log/addQuickLogToCloud'
import { DataEvents } from '../../../store/data/types'
import { EditorEvents } from '../../../store/editor/types'
import { NavbarEvents } from '../../../store/navbar/types'
import { Dispatch } from '../../../store/types'

export const addQuickAddLog = (
  calories: number,
  protein: number,
  dispatch: Dispatch<keyof NavbarEvents | keyof DataEvents | keyof EditorEvents>
) => {
  const variables = {
    objects: [] as {
      amount: number
      unit: QuickAddUnit
    }[],
  }
  // Only add the protein log if they actually entered a value for protein!
  if (protein > 0) {
    variables.objects.push({
      amount: protein,
      unit: 'PROTEIN' as QuickAddUnit,
    })
  }

  if (calories > 0) {
    variables.objects.push({
      amount: calories,
      unit: 'CALORIE' as QuickAddUnit,
    })
  }
  addQuickLogToCloud(variables, () => {
    dispatch('closeQuickAddModal')
  })
}
