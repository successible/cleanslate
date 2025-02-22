import { css } from '@emotion/react'
import type { Density, Food } from '../../../models/food'
import { Image } from '../../image/Image'
import { getImagePath, selectFoodImage } from '../helpers/selectFoodImage'
import { DensityButton } from './DensityButton'

const item = css`
  margin-top: 20px;
  > span {
    margin-right: 20px;
  }
`
export const DensityItem: React.FC<{ food: Food; density: Density }> = ({
  density,
  food,
}) => {
  const src = selectFoodImage(food, getImagePath, false)
  return (
    <div key={food.name} className={'fr'} css={item}>
      <Image
        width={50}
        height={50}
        src={src as string}
        alt="Image of the food"
      />
      <span className="ml20">{food.name}</span>
      {/* @ts-ignore */}
      <DensityButton food={food} density={density} />
    </div>
  )
}
