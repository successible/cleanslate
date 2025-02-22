import { css } from '@emotion/react'
import type React from 'react'
import type { ExerciseLog } from '../../../models/exerciseLog'
import { Divider } from '../../divider/Divider'
import { sortByCreatedAt } from '../Log/helpers/sortByCreatedAt'
import { ExerciseLogItem } from './ExerciseLogItem'

type props = {
  exercise_logs: ExerciseLog[]
}

export const ExerciseLogList: React.FC<props> = (props) => {
  const { exercise_logs } = props
  const logs = exercise_logs || []

  return (
    <div
      css={css`
        margin: 0 auto;
        width: 90%;
      `}
    >
      {sortByCreatedAt(logs).map((exercise_log) => (
        <ExerciseLogItem
          key={exercise_log.id}
          exercise_log={exercise_log as ExerciseLog}
        />
      ))}
      {logs.length >= 1 && <Divider height={2} className="mt25 mb20" />}
    </div>
  )
}
