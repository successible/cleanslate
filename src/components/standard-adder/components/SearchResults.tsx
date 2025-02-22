import { css } from '@emotion/react'
import { truncate } from 'lodash-es'
import type React from 'react'
import type { Food } from '../../../models/food'
import type { Recipe } from '../../../models/recipe'
import { colors } from '../../../theme'
import { HiddenInput } from '../../buttons/HiddenInput'
import { TRUNCATE_LENGTH } from '../../item/helpers/getNameAndTags'
import {
  getImagePath,
  selectFoodImage,
} from '../../list/helpers/selectFoodImage'

type props = {
  index: number
  result: Food | Recipe
  onClick: () => void
}
export const SearchResult: React.FC<props> = ({ index, onClick, result }) => {
  // Check if a recipe or custom food
  const isRecipe = (result: Recipe | Food) => result.type === 'recipe'
  const isCustomFood = (result: Recipe | Food) =>
    result.type === 'food' && result.foodToProfile

  const dummyFood = css`
    border-radius: 5px;
    color: ${colors.text};
    font-size: 0.7rem;
    margin-left: 15px;
    padding: 7.5px 10px;
  `

  const imageStyles = css`
    height: 35px;
    margin-left: 5px;
    margin-right: 12.5px;
    width: 35px;
  `

  const nameStyles = css`
    color: ${colors.text};
    font-size: 0.9rem;
    font-weight: 400;
  `

  return (
    <button
      onClick={() => onClick()}
      type="button"
      key={result.id}
      className={'normal w100'}
      id={`StandardAdderSearchResult-${index}`}
    >
      {!result.isDummy && <HiddenInput inputMode="decimal" />}
      <div className="fr w100">
        <img
          css={imageStyles}
          src={selectFoodImage(result, getImagePath)}
          alt="Food"
        />
        <span css={nameStyles}>
          {truncate(result.name, { length: TRUNCATE_LENGTH })}
        </span>
        {result.isDummy && (
          <div css={dummyFood} className={'pink'}>
            Expand
          </div>
        )}
        {isCustomFood(result) && (
          <div css={dummyFood} className={'blue'}>
            Custom food
          </div>
        )}
        {isRecipe(result) && (
          <div css={dummyFood} className={'green'}>
            Recipe
          </div>
        )}
      </div>
    </button>
  )
}
