import { css } from '@emotion/react'
import { Density, Food } from '../../../models/Food/model'
import { blue, green } from '../../../theme'
import { calculateFoodDensities } from '../../macros/helpers/calculateDensities'

type props = {
  food: Food
  density: Density
}

export const DensityButton: React.FC<props> = ({ density, food }) => {
  const [caloricDensity, proteinDensity] = calculateFoodDensities(food)
  const button = css`
    border-radius: 5px;
    padding: 10px;
  `

  return (
    <div className="end">
      {density === 'caloric-density' && (
        <div css={[button, green]}>{caloricDensity}</div>
      )}
      {density === 'protein-density' && (
        <div css={[button, blue]}>{proteinDensity}</div>
      )}
    </div>
  )
}
