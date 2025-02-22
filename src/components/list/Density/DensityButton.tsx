import { css } from '@emotion/react'
import type { Density, Food } from '../../../models/food'
import { blue, green, pink } from '../../../theme'
import { calculateFoodDensities } from '../../macros/helpers/calculateDensities'

type props = {
  food: Food
  density: Density
}

export const DensityButton: React.FC<props> = ({ density, food }) => {
  const [caloricDensity, proteinDensity, combinedDensity] =
    calculateFoodDensities(food)
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
      {density === 'combined-density' && (
        <div css={[button, pink]}>{combinedDensity}</div>
      )}
    </div>
  )
}
