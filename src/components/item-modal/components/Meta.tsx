/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react'
import { capitalize } from '../../../helpers/utility/capitalize'
import { imageStyling, nameStyling } from '../../item/components/Meta'
import { getNameAndTags } from '../../item/helpers/getNameAndTags'
import { CommonItem } from '../../item/types'

type props = {
  item: CommonItem
}
export const Meta: React.FC<props> = ({ item }) => {
  const { alias, barcode, childRecipe, food, name, recipe, src } = item
  const nameToUse =
    recipe?.name ||
    food?.name ||
    childRecipe?.name ||
    capitalize(barcode?.name || '') ||
    name ||
    ''
  const meta = css`
    font-size: 1rem !important;
    margin-bottom: 0 !important;
  `
  return (
    <div className={'fr w100 mb20'}>
      {src && <img css={imageStyling} alt="Item" src={src}></img>}
      <div css={meta} className={`${nameStyling}`}>
        {getNameAndTags(nameToUse, alias || '')}
      </div>
    </div>
  )
}
