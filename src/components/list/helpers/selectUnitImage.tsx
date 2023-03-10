import Calorie from '../../../assets/common/calorie.svg'
import Exercise from '../../../assets/common/fastexercise.svg'
import Protein from '../../../assets/common/protein.svg'
import { Unit } from '../../../constants/units'

export const selectUnitImage = (unit: Unit) => {
  if (unit === 'CALORIE') {
    return Calorie.src
  } else if (unit === 'PROTEIN') {
    return Protein.src
  } else if (unit === 'EXERCISE') {
    return Exercise.src
  } else {
    throw Error(`Error: selectUnitImage: ${unit}`)
  }
}
