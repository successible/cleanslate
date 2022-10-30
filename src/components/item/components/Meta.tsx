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
  line-height: 0px;
`

export const imageStyling = css`
  height: 40px;
  margin-right: 15px;
  width: 40px;
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
              className={['food', 'recipe'].includes(type) ? 'fcs' : ''}
              css={[
                nameStyling,
                src === null && withoutImage,
                isCustomLog && custom,
                isCustomFoodItem && green,
                isRecipeItem && blue,
                css`
                  height: ${['food', 'recipe'].includes(type)
                    ? '40px !important;'
                    : 'auto'};
                  justify-content: center;
                `,
              ]}
            >
              {getNameAndTags(nameToUse, alias || '')}
            </div>
            {!['food', 'recipe'].includes(type) && (
              <div
                className="fr ml5"
                css={css`
                  font-size: 11px !important;
                  position: relative;
                  top: 0.24px;
                `}
              >
                (<Amount amount={amount} />
                <UnitInput item={item} unit={unit} />)
              </div>
            )}
          </div>
          {!isCustomFoodItem && !isRecipeItem && profile && (
            <div className="fr">
              <div className="mt5">{renderMacros(item, profile)}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
