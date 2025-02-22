import { css } from '@emotion/react'
import type React from 'react'
import type { QuickLog } from '../../../models/quickLog'
import { Divider } from '../../divider/Divider'
import { sortByCreatedAt } from '../Log/helpers/sortByCreatedAt'
import { QuickLogItem } from './QuickLogItem'

type props = {
  quick_logs: QuickLog[]
}

export const QuickLogList: React.FC<props> = (props) => {
  const { quick_logs } = props
  const logs = quick_logs || []

  return (
    <div
      css={css`
        margin: 0 auto;
        width: 90%;
      `}
    >
      {sortByCreatedAt(logs).map((quick_log) => (
        <QuickLogItem key={quick_log.id} quick_log={quick_log as QuickLog} />
      ))}
      {logs.length >= 1 && <Divider height={2} className="mt25 mb20" />}
    </div>
  )
}
