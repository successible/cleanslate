/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react'
import { capitalize } from '../../../helpers/utility/capitalize'
import { AllEvents } from '../../../store/store'
import { Dispatch } from '../../../store/types'
import { blue, green } from '../../../theme'
import { getNameAndTags } from '../helpers/getNameAndTags'
import { renderMacros } from '../helpers/renderMacros'
import { spawnItemEditModal } from '../helpers/spawnItemEditModal'
import { CommonItem } from '../types'
import { Amount } from './Amount'
import { UnitInput } from './UnitInput'

type props = {
  item: CommonItem
  dispatch: Dispatch<AllEvents>
}

export const nameStyling = css`
  font-size: 13px;
  margin-bottom: 3px;
  white-space: nowrap;
`

export const imageStyling = css`
  height: 35px;
  margin-right: 20px;
  width: 35px;
`

export const withoutImage = css`
  border-radius: 5px;
  font-size: 14px;
  padding: 10px 15px;
`

export const custom = css`
  cursor: pointer;
  text-decoration: underline;
`

export const Meta: React.FC<props> = ({ dispatch, item }) => {
  const {
    alias,
    amount,
    barcode,
    food,
    name,
    profile,
    recipe,
    src,
    type,
    unit,
  } = item
  const nameToUse =
    type !== 'log'
      ? name
      : recipe?.name ||
        food?.name ||
        capitalize(barcode?.name || '') ||
        name ||
        ''

  const isRecipeItem = type === 'recipe'
  const isCustomFoodItem = Boolean(type === 'food' && profile)
  const isCustomLog =
    type === 'log' && Boolean(food?.foodToProfile?.authId || recipe)
  const cl = isCustomLog

  const styles = css`
    cursor: ${cl ? 'pointer' : ''};
  `

  return (
    <div className={`fr expand`}>
      <div
        onClick={() => spawnItemEditModal(item, dispatch)}
        className={`fr ${styles}`}
      >
        {/* @ts-ignore */}
        {src && <img css={imageStyling} alt="Item" src={src}></img>}
        <div className="fc">
          <div className="fr">
            <div
              css={[
                nameStyling,
                src === null && withoutImage,
                isCustomLog && custom,
                isCustomFoodItem && green,
                isRecipeItem && blue,
              ]}
            >
              {getNameAndTags(nameToUse, alias || '')}
            </div>
          </div>
          {!isCustomFoodItem && !isRecipeItem && (
            <div>
              <div className="fr">
                <Amount amount={amount} />
                <UnitInput item={item} unit={unit} />
                <div className="mt5 ml10">{renderMacros(item)}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
