import { css } from '@emotion/react'
import Link from 'next/link'
import React from 'react'
import { useStoreon } from 'storeon/react'
import { colors } from 'chagall/src/chagall'

import CalMini from '../../assets/common/calmini.svg'
import ProteinMini from '../../assets/common/proteinmini.svg'
import { Log } from '../../models/Log/model'
import { AllEvents } from '../../store/store'
import { Dispatch } from '../../store/types'
import { Image } from '../image/Image'
import { calculateFoodOrRecipeDensities } from './helpers/calculateDensities'
import { calculateMacros } from './helpers/calculateMacros'

type props = {
  log: Log
}

export const Macros: React.FC<props> = ({ log }) => {
  const { dispatch }: { dispatch: Dispatch<AllEvents> } = useStoreon()

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
              onClick={() =>
                dispatch(
                  'openInformationModal',
                  <div>
                    <strong>
                      {densities[0]}/{densities[1]}
                    </strong>{' '}
                    stands for caloric density ({densities[0]}) and protein
                    density ({densities[1]}). To learn more about them, first
                    navigate to{' '}
                    <a
                      href="https://cleanslate.sh/weight-loss"
                      target="_blank"
                      rel="noreferrer"
                    >
                      here
                    </a>
                    . Then, read the third and fourth sections.
                    <br />
                    <br />
                    If you would like to see a reference table of all basic
                    foods by caloric and protein density, navigate to{' '}
                    <a href="/foods" target="_blank" rel="noreferrer">
                      here
                    </a>
                    .
                  </div>
                )
              }
              css={css`
                background-color: ${colors.blue};
                padding: 2.5px 5px;
                border-radius: 5px;
                margin-left: 7px;
                cursor: pointer;
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
