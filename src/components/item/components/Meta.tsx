import { css } from '@emotion/react'
import { truncate } from 'lodash-es'
import { capitalize } from '../../../helpers/capitalize'
import type { AllEvents } from '../../../store/store'
import type { Dispatch } from '../../../store/types'
import { blue, green } from '../../../theme'
import { QuickLogMacros } from '../../macros/QuickLogMacros'
import { TRUNCATE_LENGTH, getNameAndTags } from '../helpers/getNameAndTags'
import { renderMacros } from '../helpers/renderMacros'
import { spawnItemEditModal } from '../helpers/spawnItemEditModal'
import type { CommonItem } from '../types'
import { Amount } from './Amount'
import { ConsumeButton } from './ConsumeButton'
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
    calories,
    food,
    name,
    profile,
    protein,
    recipe,
    src,
    type,
    unit,
  } = item

  const isRecipe = type === 'recipe'
  const isCustomFood = Boolean(type === 'food' && profile)
  const isCustomLog =
    type === 'log' && Boolean(food?.foodToProfile?.authId || recipe)

  const result = getNameAndTags(
    type !== 'log'
      ? capitalize(barcode?.name || '') || name
      : recipe?.name ||
          food?.name ||
          capitalize(barcode?.name || '') ||
          name ||
          '',
    alias || ''
  )

  const truncateLength =
    (type === 'log' && unit) || type === 'ingredient'
      ? TRUNCATE_LENGTH - 11
      : TRUNCATE_LENGTH - 5

  return (
    <div className={'fr expand'}>
      <div className={`fr ${isCustomLog ? 'pointer' : ''}`}>
        {src && <img css={imageStyling} alt="Item" src={src} />}
        <div className="fc">
          <div className="fr">
            <div
              id="MetaItemName"
              onClick={() => isCustomLog && spawnItemEditModal(item, dispatch)}
              className={['food', 'recipe'].includes(type) ? 'fcs' : ''}
              css={[
                nameStyling,
                src === null && withoutImage,
                isCustomLog && custom,
                isCustomFood && green,
                isRecipe && blue,
                css`
                  height: ${
                    ['food', 'recipe'].includes(type)
                      ? '40px !important;'
                      : 'auto'
                  };
                  justify-content: center;
                  white-space: nowrap;
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
          </div>
          <div>
            <Tags tags={result.tags} />
          </div>
          {!isCustomFood && !isRecipe && profile && (
            <div className="fr">
              <div className="mt5">{renderMacros(item, profile)}</div>
            </div>
          )}
          {type === 'quick-log' && (
            <div className="fr">
              <div className="mt5">
                <QuickLogMacros
                  protein={protein}
                  calories={calories}
                  showProtein={true}
                />
              </div>
            </div>
          )}
          {type === 'exercise-log' && (
            <div className="fr">
              <div className="mt5">
                <QuickLogMacros
                  protein={0}
                  calories={amount}
                  showProtein={false}
                />
              </div>
            </div>
          )}
          {item.type === 'log' && item.profile?.enablePlanning && (
            <ConsumeButton item={item} dispatch={dispatch} />
          )}
        </div>
      </div>
    </div>
  )
}
