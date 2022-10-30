import { css } from '@emotion/react'
import React from 'react'
import { profileIsLoaded } from '../../../helpers/data/profileIsLoaded'
import { Food } from '../../../models/Food/model'
import { quickAddUnits } from '../../../models/Log/constants'
import { Log } from '../../../models/Log/model'
import { Unit } from '../../../models/Log/types'
import { Profile } from '../../../models/Profile/model'
import { Spinner } from '../../spinner/Spinner'
import { sortByCreatedAt } from './helpers/sortByCreatedAt'
import { LogItem } from './LogItem'
import { Shell } from './Shell'

type props = {
  logs: Log[]
  foods: Food[]
  profile: Profile
}

export const LogList: React.FC<props> = (props) => {
  const { logs, profile } = props
  const units: Unit[] = quickAddUnits

  const logsToUse = sortByCreatedAt(
    [...logs].filter((log) => !units.includes(log.unit))
  ) as Log[]

  return (
    <div
      css={css`
        margin: 0 auto;
        width: 90%;
      `}
    >
      {logs.length > 0 ? (
        logsToUse.map((log: Log) => (
          <LogItem key={log.id} log={log} profile={profile} renderUnit={true} />
        ))
      ) : // Only show the shell if the user is logged in but hasn't added any logs for the day
      profileIsLoaded(profile) ? (
        <Shell profile={profile} />
      ) : (
        <div className="w100 h100">
          <Spinner />
        </div>
      )}
    </div>
  )
}
