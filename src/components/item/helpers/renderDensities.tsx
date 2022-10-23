import CaloricDensity from '../../../assets/common/caldensity.svg'
import ProteinDensity from '../../../assets/common/proteindensity.svg'
import { Log } from '../../../models/Log/model'
import { Image } from '../../image/Image'
import { calculateFoodOrRecipeDensities } from '../../macros/helpers/calculateDensities'
import { calculateMacros } from '../../macros/helpers/calculateMacros'

export const renderDensities = (log: Log) => {
  // Add the logToFood and logToRecipe key
  const [caloriesConsumed, proteinConsumed] = calculateMacros([log]).map((v) =>
    Math.round(v)
  )
  const recipe = log.logToRecipe
  const food = log.logToFood
  const output = calculateFoodOrRecipeDensities(
    log.amount,
    food || recipe,
    caloriesConsumed,
    proteinConsumed
  )
  if (output) {
    return (
      <div className="fr">
        <Image
          width={20}
          height={20}
          alt="Caloric density"
          src={CaloricDensity}
        />
        <span>{output[0]}</span>
        <Image
          width={20}
          height={20}
          alt="Protein density"
          src={ProteinDensity}
        />
        <span>{output[1]}%</span>
      </div>
    )
  }
}
