import { css } from '@emotion/react'
import type React from 'react'
import type { WaterLog } from '../../../models/waterLog'
import { Divider } from '../../divider/Divider'
import { sortByCreatedAt } from '../Log/helpers/sortByCreatedAt'
import { WaterLogItem } from './WaterLogItem'

type props = {
  water_logs: WaterLog[]
}

export const WaterLogList: React.FC<props> = (props) => {
  const { water_logs } = props
  const logs = water_logs || []

  return (
    <div
      css={css`
        margin: 0 auto;
        width: 90%;
      `}
    >
      {sortByCreatedAt(logs).map((water_log) => (
        <WaterLogItem key={water_log.id} water_log={water_log as WaterLog} />
      ))}
      {logs.length >= 1 && <Divider height={2} className="mt25 mb20" />}
    </div>
  )
}
