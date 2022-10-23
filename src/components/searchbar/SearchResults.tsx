import { css } from '@emotion/react'

/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Food } from '../../models/Food/model'
import { Recipe } from '../../models/Recipes/model'
import { store } from '../../store/store'
import { colors } from '../../theme'
import { HiddenInput } from '../buttons/HiddenInput'
import { getImagePath, selectFoodImage } from '../list/helpers/selectFoodImage'

type props = {
  results: (Recipe | Food)[]
  onFind: (result: Recipe | Food) => void
  searchbarValue: string
}
export const SearchResults: React.FC<props> = ({
  onFind,
  results,
  searchbarValue,
}) => {
  // Check if a recipe or custom food
  const isRecipe = (result: Recipe | Food) => result.type === 'recipe'
  const isCustomFood = (result: Recipe | Food) =>
    result.type === 'food' && result.foodToProfile

  const dummyFood = css`
    border-radius: 5px;
    color: ${colors.text};
    font-size: 0.7rem;
    margin-left: 10px;
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

  const invisible = results.length === 0 && searchbarValue === ''
  return (
    <div
      id="SearchbarSearchResults"
      className={`w100 fcs wrap fr mb20 ${invisible ? 'invisible' : 'visible'}`}
    >
      {results.map((result: Recipe | Food, i) => (
        <button
          onClick={() => {
            onFind(result)
          }}
          type="button"
          key={result.id}
          className={`normal w100 ${i === 0 ? 'mt15' : ''}`}
        >
          {!result.isDummy && <HiddenInput inputMode="decimal" />}
          <div className="fr w100">
            <img
              css={imageStyles}
              src={selectFoodImage(result, getImagePath)}
              alt="Food"
            />
            <span css={nameStyles}>{result.name}</span>
            {result.isDummy && (
              <div css={dummyFood} className={`pink`}>
                Expand
              </div>
            )}
            {isCustomFood(result) && (
              <div css={dummyFood} className={`pink`}>
                Custom
              </div>
            )}
            {isRecipe(result) && (
              <div css={dummyFood} className={`pink`}>
                Recipe
              </div>
            )}
          </div>
        </button>
      ))}
      <div className="fr w100 mt10">
        <button
          onClick={() => store.dispatch('openInformationModal')}
          type="button"
          className="blue ml25 mt10 small"
        >
          Can{`'`}t find it?
        </button>
      </div>
    </div>
  )
}
