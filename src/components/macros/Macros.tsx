import { css } from '@emotion/react'
import React from 'react'
import CalMini from '../../assets/common/calmini.svg'
import ProteinMini from '../../assets/common/proteinmini.svg'
import { Log } from '../../models/Log/model'
import { Image } from '../image/Image'
import { renderDensities } from '../item/helpers/renderDensities'
import { calculateMacros } from './helpers/calculateMacros'

type props = {
  log: Log
  showDensities: boolean
}

export const Macros: React.FC<props> = ({ log, showDensities }) => {
  const [caloriesConsumed, proteinConsumed] = calculateMacros([log]).map((v) =>
    Math.round(v)
  )

  const macros = css`
    font-size: 12px;
    margin-left: auto;
  `

  if (caloriesConsumed >= 0) {
    return (
      <div id="macros" css={macros}>
        <div className="fr">
          <div className="mr10">
            <Image width={10} height={10} alt="Fire" src={CalMini} />
            <span className="ml5">{caloriesConsumed}</span>
          </div>
          <div>
            <Image
              width={10}
              height={10}
              alt="Strong arm flexing"
              src={ProteinMini}
            />
            <span className="ml5">{proteinConsumed}</span>
          </div>
        </div>
        {showDensities && <div>{renderDensities(log)}</div>}
      </div>
    )
  } else {
    return <div />
  }
}
