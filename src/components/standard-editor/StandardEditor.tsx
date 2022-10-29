import React from 'react'
import { useStoreon } from 'storeon/react'
import { convertToNumber } from '../../helpers/utility/convertToNumber'
import { Food } from '../../models/Food/model'
import { Unit } from '../../models/Log/types'
import { EditorState } from '../../store/editor/types'
import { AllEvents } from '../../store/store'
import { Dispatch } from '../../store/types'
import { getPrettyUnits } from '../list/helpers/getPrettyUnits'
import { Searcher } from '../searchbar/Searcher'
import { SearchResults } from './components/SearchResults'
import { convertFractionToDecimal } from './helpers/convertFractionToDecimal'
import { getDefaultUnit } from './helpers/getDefaultUnit'
import { onFind } from './helpers/onFind'
import { submitEditor } from './helpers/submitEditor'

export type EditorMode = 'standard' | 'quickAdd'

export type EditorType = 'ingredient' | 'log'

type props = { foods: Food[]; type: EditorType }
export const StandardEditor: React.FC<props> = ({ foods, type }) => {
  const {
    dispatch,
    editor,
  }: {
    dispatch: Dispatch<AllEvents>
    editor: EditorState
  } = useStoreon('editor')

  // Create the initial form state
  const { dummyFood, searchResult } = editor
  const defaultUnit = searchResult
    ? getDefaultUnit(getPrettyUnits(searchResult))
    : null
  const [unit, setUnit] = React.useState(defaultUnit as null | Unit)
  const [amount, setAmount] = React.useState('' as React.ReactText)

  React.useEffect(() => {
    // Clear the input modal when it mounts and unmounts
    setAmount('')
    setUnit(searchResult ? getDefaultUnit(getPrettyUnits(searchResult)) : null)
  }, [searchResult, dummyFood])

  // Create the function to submit a log or ingredient
  const amountAsNumber = convertToNumber(convertFractionToDecimal(amount))
  const submit = () =>
    submitEditor(
      type,
      searchResult?.alias || null,
      amountAsNumber,
      unit,
      null,
      dispatch,
      searchResult
    )

  return (
    <div className="w100">
      <div
        id="Searcher"
        className={`${!searchResult ? 'visible' : 'invisible'}`}
      >
        <Searcher
          onFind={(result) => onFind(result, dispatch)}
          onSuccess={(result) => onFind(result, dispatch)}
          foods={foods}
          resultsToShow={3}
          focus={true}
        />
      </div>

      {/* Search results */}
      {/* Only show when the search is successful */}
      <div
        id="SearchResults"
        className={`${searchResult ? 'visible' : 'invisible'}`}
      >
        <SearchResults
          amount={amount}
          unit={unit}
          setAmount={setAmount}
          setUnit={setUnit}
          searchResult={searchResult}
          submit={submit}
          dispatch={dispatch}
        />
      </div>
    </div>
  )
}
