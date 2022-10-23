/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react'
import React from 'react'
import Back from '../../../assets/common/back.svg'
import { Key } from '../../../helpers/ui/createShortcuts'
import { Food } from '../../../models/Food/model'
import { Recipe } from '../../../models/Recipes/model'
import { Image } from '../../image/Image'
import { getNameAndTags } from '../../item/helpers/getNameAndTags'
import {
  getImagePath,
  selectFoodImage,
} from '../../list/helpers/selectFoodImage'

type props = {
  searchResult: Food | Recipe | null
  back: () => void
  showBack: boolean
  isDummy: boolean
}

const backButton = css`
  margin-left: auto;
  padding-bottom: 10px;
  padding-top: 10px;

  img {
    height: 18px;
    width: 18px;
  }
`

export const Meta: React.FC<props> = ({ back, searchResult, showBack }) => {
  return (
    <div className={`w100 fr m20`}>
      {/* name and image */}
      <img
        css={css`
          height: 50px;
          margin-right: 10px;
          width: 50px;
        `}
        src={selectFoodImage(searchResult, getImagePath)}
        alt="Food"
      />
      <span
        css={css`
          font-size: 1rem;
          font-weight: 400;
        `}
      >
        {getNameAndTags(searchResult?.name || '', searchResult?.alias || '')}
      </span>
      {showBack && (
        <button
          onClick={() => {
            back()
          }}
          onKeyPress={(event) => {
            const key = event.key as Key
            key === 'Enter' && back()
          }}
          css={backButton}
          className={`background z1`}
          type="button"
        >
          <Image alt="Back" height={18} width={18} src={Back} />
        </button>
      )}
    </div>
  )
}
