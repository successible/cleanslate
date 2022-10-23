import { css } from '@emotion/react'
import { Key } from 'readline'
import { Unit } from '../../../models/Log/types'
import { SearchResult } from '../../../store/editor/types'
import { AllEvents } from '../../../store/store'
import { Dispatch } from '../../../store/types'
import { ButtonPanel } from './ButtonPanel'
import { InputFields } from './InputFields'
import { Meta } from './Meta'

type props = {
  amount: React.Key
  setAmount: (amount: React.Key) => void
  setUnit: (unit: Unit) => void
  unit: Unit | null
  searchResult: SearchResult
  submit: () => void
  dispatch: Dispatch<AllEvents>
}
export const SearchResults: React.FC<props> = ({
  amount,
  dispatch,
  searchResult,
  setAmount,
  setUnit,
  submit,
  unit,
}) => {
  // The condition for the submit button to spawn when plan mode is active vs. not
  const submitReady = Boolean(amount && unit)

  const container = css`
    margin: 0 auto;
    max-width: 500px;
  `

  return (
    <form
      css={container}
      className={`mb20`}
      onKeyPress={(event) => {
        if ((event.key as Key) === 'Enter') {
          event.preventDefault()
          submitReady && submit()
        }
      }}
    >
      <div className="fcc">
        <Meta
          isDummy={false}
          searchResult={searchResult}
          showBack={true}
          back={() => {
            dispatch('saveSearchResult', null)
            dispatch('saveDummyFood', null)
          }}
        />
        <InputFields
          searchResult={searchResult}
          unit={unit}
          setUnit={setUnit}
          amount={amount}
          setAmount={setAmount}
        />
        <ButtonPanel showSubmit={submitReady} submit={() => submit()} />
      </div>
    </form>
  )
}
