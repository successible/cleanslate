import { css } from '@emotion/react'
import React from 'react'
import { quickAddUnits } from '../../../constants/units'
import { Unit } from '../../../constants/units'
import { profileIsLoaded } from '../../../helpers/profileIsLoaded'
import { Food } from '../../../models/food'
import { Log } from '../../../models/log'
import { Profile } from '../../../models/profile'
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
