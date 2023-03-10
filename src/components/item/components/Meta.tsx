/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react'
import truncate from 'lodash.truncate'
import { quickAddUnits } from '../../../constants/units'
import { capitalize } from '../../../helpers/capitalize'
import { AllEvents } from '../../../store/store'
import { Dispatch } from '../../../store/types'
import { blue, colors, green } from '../../../theme'
import { getNameAndTags, TRUNCATE_LENGTH } from '../helpers/getNameAndTags'
import { renderMacros } from '../helpers/renderMacros'
import { spawnItemEditModal } from '../helpers/spawnItemEditModal'
import { CommonItem } from '../types'
import { Amount } from './Amount'
import { Tags } from './Tags'
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

  const isRecipeItem = type === 'recipe'
  const isCustomFoodItem = Boolean(type === 'food' && profile)

  const isCustomLog =
    type === 'log' && Boolean(food?.foodToProfile?.authId || recipe)

  const result = getNameAndTags(
    type !== 'log'
      ? name
      : recipe?.name ||
          food?.name ||
          capitalize(barcode?.name || '') ||
          name ||
          '',
    alias || ''
  )

  const truncateLength =
    (type === 'log' && unit && !quickAddUnits.includes(unit)) ||
    type === 'ingredient'
      ? TRUNCATE_LENGTH - 11
      : TRUNCATE_LENGTH - 5

  return (
    <div className={`fr expand`}>
      <div
        onClick={() => spawnItemEditModal(item, dispatch)}
        className={`fr ${isCustomLog ? 'pointer' : ''}`}
      >
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
                  white-space: nowrap;
                  width: ${unit && quickAddUnits.includes(unit)
                    ? '125px'
                    : undefined};
                `,
              ]}
            >
              {truncate(result.name, { length: truncateLength })}
            </div>

            {(type === 'ingredient' || type === 'log') && (
              <div
                className="fr"
                css={css`
                  font-size: 11px !important;
                  position: relative;
                  margin-left: 6px;
                `}
              >
                (<Amount amount={amount} />
                {<UnitInput item={item} unit={unit} />})
              </div>
            )}

            {type === 'unit' && (
              <div
                className="fr ml5"
                css={css`
                  font-size: 13px !important;
                  background-color: ${unit === 'PROTEIN'
                    ? colors.blue
                    : colors.green};
                  padding: 5px;
                  border-radius: 5px;
                  min-width: 40px;
                `}
              >
                <div
                  css={css`
                    margin: 0px auto;
                  `}
                >
                  <Amount amount={amount} />
                </div>
              </div>
            )}
          </div>
          <div>
            <Tags tags={result.tags} />
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
