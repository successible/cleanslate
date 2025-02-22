import { css } from '@emotion/react'
import { capitalize } from '../../../helpers/capitalize'
import { imageStyling, nameStyling } from '../../item/components/Meta'
import { Tags } from '../../item/components/Tags'
import { getNameAndTags } from '../../item/helpers/getNameAndTags'
import type { CommonItem } from '../../item/types'

type props = {
  item: CommonItem
}
export const Meta: React.FC<props> = ({ item }) => {
  const { alias, barcode, childRecipe, food, name, recipe, src } = item
  const result = getNameAndTags(
    recipe?.name ||
      capitalize(barcode?.name || '') ||
      food?.name ||
      childRecipe?.name ||
      name ||
      '',
    alias || ''
  )
  const meta = css`
    font-size: 1rem !important;
    margin-bottom: 0 !important;
  `

  return (
    <div className={'fr w100 mb20'}>
      {src && <img css={imageStyling} alt="Item" src={src} />}
      <div css={meta} className={`${nameStyling}`}>
        {result.name}
        <Tags tags={result.tags} />
      </div>
    </div>
  )
}
