import { SerializedStyles } from '@emotion/react'
import React from 'react'
import { useStoreon } from 'storeon/react'
import { Food } from '../../models/Food/model'
import { Recipe } from '../../models/Recipes/model'
import { EditorState } from '../../store/editor/types'
import { AllEvents } from '../../store/store'
import { Dispatch } from '../../store/types'
import { RelatedFoods } from '../related-foods/RelatedFoods'
import { Meta } from '../standard-editor/components/Meta'
import { EditorMode } from '../standard-editor/StandardEditor'
import { createDefaultDummyFood } from './helpers/createDefaultDummyFood'
import { isSearchableDummyFood } from './helpers/isSearchableDummyFood'
import { Searchbar } from './Searchbar'

type props = {
  editorMode?: EditorMode
  foods: Food[]
  // onFind refers to when you find a food directly from the Searchbar, like raisins
  onFind: (result: Food | Recipe) => void
  // onSuccess refers to when you reach the end of a dummy food, like turkey breast with skin
  onSuccess: (food: Food) => void
  resultsToShow: number
  focus: boolean
  searchbarStyles?: SerializedStyles
}
export const Searcher: React.FC<props> = ({
  focus,
  foods,
  onFind,
  onSuccess,
  resultsToShow,
  searchbarStyles,
}) => {
  const {
    dispatch,
    editor,
  }: { dispatch: Dispatch<AllEvents>; editor: EditorState } =
    useStoreon('editor')
  const { dummyFood, searchResult } = editor

  const [searchText, setSearchText] = React.useState('')
  const setSearchResults = React.useState([] as (Recipe | Food)[])[1]

  const searchbar = React.useRef<HTMLInputElement>(null)

  // Focus on the first related food when visible
  React.useEffect(() => {
    if (isSearchableDummyFood(dummyFood)) {
      searchbar.current?.focus()
    }
  }, [dummyFood, searchResult])

  return (
    <div className="fcs w95 center">
      <div className={`w100 ${!dummyFood ? 'visible' : 'invisible'}`}>
        <Searchbar
          onSearch={(results: (Recipe | Food)[]) => {
            setSearchResults(results)
          }}
          onFind={(result: Food | Recipe) => {
            onFind(result)
          }}
          resultsToShow={resultsToShow}
          focus={focus}
          styles={searchbarStyles}
        />
      </div>

      {/* Dummy food section - Show it only when dummy is true and search result is false */}
      <div className={`w100 ${dummyFood ? 'visible' : 'invisible'}`}>
        <form
          className="mb20"
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <div className="fcc">
            <Meta
              isDummy={true}
              searchResult={dummyFood}
              showBack={true}
              back={() => {
                dispatch('saveDummyFood', null)
              }}
            />

            {isSearchableDummyFood(dummyFood) && (
              <input
                ref={searchbar}
                type="text"
                autoCapitalize={'off'}
                autoComplete={'off'}
                autoCorrect={'off'}
                inputMode="text"
                value={searchText}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const text = event.target.value
                  setSearchText(text)
                }}
                placeholder={'Filter by name...'}
                className="fr mt20 mb30"
              />
            )}
            <RelatedFoods
              dummyFood={dummyFood || createDefaultDummyFood()}
              foods={foods}
              onSuccess={(food: Food) => {
                setSearchText('')
                onSuccess(food)
              }}
              searchText={searchText}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
