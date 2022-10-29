import { css } from '@emotion/react'
import React from 'react'
import { colors } from 'chagall/src/chagall'
import CalMini from '../../assets/common/calmini.svg'
import ProteinMini from '../../assets/common/proteinmini.svg'

import { Log } from '../../models/Log/model'
import { Image } from '../image/Image'
import { calculateFoodOrRecipeDensities } from './helpers/calculateDensities'
import { calculateMacros } from './helpers/calculateMacros'

type props = {
  log: Log
}

export const Macros: React.FC<props> = ({ log }) => {
  const [caloriesConsumed, proteinConsumed] = calculateMacros([log]).map((v) =>
    Math.round(v)
  )

  const densities = calculateFoodOrRecipeDensities(
    log.amount,
    log.barcode || log.logToFood || log.logToRecipe,
    caloriesConsumed,
    proteinConsumed
  )

  const macros = css`
    font-size: 12px;
    margin-left: auto;
    white-space: nowrap;

    img {
      margin: 0px 5px;
    }
  `

  if (caloriesConsumed >= 0) {
    return (
      <div id="macros" css={macros}>
        <div className="fr">
          <div>
            <Image width={10} height={10} alt="Fire" src={CalMini} />
            <span>{caloriesConsumed}</span>
          </div>
          <div>
            <Image
              width={10}
              height={10}
              alt="Strong arm flexing"
              src={ProteinMini}
            />
            <span>{proteinConsumed}</span>
          </div>
          {densities && (
            <span
              css={css`
                background-color: ${colors.blue};
                padding: 2.5px 5px;
                border-radius: 5px;
                margin-left: 7px;
              `}
            >
              {densities[0]}/{densities[1]}
            </span>
          )}
        </div>
      </div>
    )
  } else {
    return <div />
  }
}
