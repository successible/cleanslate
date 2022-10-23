import Link from 'next/link'
import React from 'react'
import { documentation } from '../settings/Settings'

export const informationModalExplanation = () => (
  <>
    <p>
      Clean Slate is faster (and different) due to our philosophy. To lose
      weight:
    </p>
    <ul>
      <li>
        You need to know how many calories you
        {`'`}re eating about <strong>90%</strong> of the time. That means simple
        food that is easy to track. We call those <strong>Basic Foods</strong>.
        For example, one pound of carrots will always equal ~ 180 calories.
        However, one brownie could equal 200 calories or 700. Who knows! It all
        depends on how it was made.
      </li>
      <li>
        You don{`'`}t need to log the other <strong>10%</strong>. The occasional
        brownie at restaurant or birthday party is not going to derail your
        progress. Plus, the point is enjoyment! Nothing makes people hate
        calorie counting more than doing it without breaks.
      </li>
    </ul>
    <p>
      Hence, because we omit the food we cannot estimate, like brownies, we can
      log everything else much faster. For example:
    </p>
    <ul>
      <li>Log ingredients via search.</li>
      <li>
        Log calories and protein directly via <strong>Quick Add</strong>.
      </li>
      <li>Create custom foods and recipes and log those.</li>
    </ul>
  </>
)

export const InformationModal: React.FC = () => {
  return (
    <div css={documentation} className={`fc`}>
      <h1>I can{`'`}t find this food!</h1>
      <div className="mt10">
        <p>
          Don{`'`}t panic, this is <strong>by design</strong>.
        </p>
        <p>
          As we cover{' '}
          <Link href="/weight-loss" passHref>
            <a>here</a>
          </Link>
          , to lose weight:
        </p>
        {informationModalExplanation()}
      </div>
    </div>
  )
}
