import React from 'react'
import { documentation } from '../settings/Settings'

export const InformationModal: React.FC<{
  Information: React.ReactNode | string | null
}> = ({ Information }) => {
  return (
    <div css={documentation} className={`fc`}>
      {Information ? (
        <div>{Information}</div>
      ) : (
        <>
          <h1>I cannot find a food!</h1>
          <div className="mt10">
            <p>Don{`'`}t panic, this is by design.</p>
            <ul>
              <li>
                We omit branded foods because they already have nutrition
                labels.
              </li>
              <li>
                We omit foods served at restaurant, like brownies or pizza,
                because we cannot estimate them accurately.
              </li>
            </ul>
            <p>
              By doing so, we remove a ton of clutter from the interface. This,
              in turn, makes logging everything else much simpler and faster!
            </p>
          </div>
        </>
      )}
    </div>
  )
}
