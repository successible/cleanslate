/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react'
import React from 'react'
import Back from '../../../assets/common/back.svg'
import { Key } from '../../../helpers/createShortcuts'
import { Food } from '../../../models/food'
import { Recipe } from '../../../models/recipe'
import { Image } from '../../image/Image'
import { Tags } from '../../item/components/Tags'
import { getNameAndTags } from '../../item/helpers/getNameAndTags'
import {
  getImagePath,
  selectFoodImage,
} from '../../list/helpers/selectFoodImage'

type props = {
  selectedItem: Food | Recipe
  onBack: () => void
  showBack: boolean
  isDummy: boolean
  path: string[]
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

export const Meta: React.FC<props> = ({
  onBack,
  path,
  selectedItem,
  showBack,
}) => {
  const result = getNameAndTags(
    selectedItem?.name || '',
    selectedItem?.alias || ''
  )

  return (
    <div id="StandardAdderMeta" className={`w100 fr m20`}>
      {/* name and image */}
      <img
        id="StandardAdderMetaImage"
        css={css`
          height: 50px;
          margin-right: 10px;
          width: 50px;
        `}
        src={selectFoodImage(selectedItem, getImagePath)}
        alt="Food"
      />
      <span
        id="StandardAdderMetaName"
        css={css`
          font-size: 1rem;
          font-weight: 400;
        `}
      >
        {result.name}
        {result.tags.length >= 1 && <Tags tags={result.tags} />}
        {path.length >= 1 && <Tags tags={path.slice(1)} />}
      </span>
      {showBack && (
        <button
          id="StandardAdderMetaButton"
          onClick={() => {
            onBack()
          }}
          onKeyDown={(event) => {
            const key = event.key as Key
            key === 'Enter' && onBack()
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
