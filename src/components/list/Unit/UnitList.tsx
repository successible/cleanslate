import { css } from '@emotion/react'
import React from 'react'
import { quickAddUnits } from '../../../constants/units'
import { zipObject } from '../../../helpers/zipObject'
import { Log } from '../../../models/log'
import { Divider } from '../../divider/Divider'
import { getCombinedLogs } from './helpers/getCombinedLogs'
import { getCount } from './helpers/getCount'
import { UnitItem } from './UnitItem'

type props = {
  logs: Log[]
}

export const UnitList: React.FC<props> = (props) => {
  const { logs } = props

  // To implement custom ordering: CALORIE -> PROTEIN -> EXERCISE
  const ordering = zipObject(quickAddUnits, [1, 2, 3])

  return (
    <div
      css={css`
        margin: 0 auto;
        width: 90%;
      `}
    >
      {getCombinedLogs(logs)
        .sort(
          (logA: Log, logB: Log) => ordering[logA.unit] - ordering[logB.unit]
        )
        // Don't show any log with no amount
        .filter((log: Log) => log.amount !== 0)
        .map((log: Log) => (
          <UnitItem key={log.id} log={log} />
        ))}
      {getCount(logs) >= 1 && <Divider height={2} className="mt25 mb20" />}
    </div>
  )
}
