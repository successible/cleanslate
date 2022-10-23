import { css, SerializedStyles } from '@emotion/react'
import React from 'react'
import { useStoreon } from 'storeon/react'
import { getFoods } from '../../models/Food/helpers/getFoods'
import { Food } from '../../models/Food/model'
import { Recipe } from '../../models/Recipes/model'
import { Data } from '../../store/data/types'
import { NavbarState } from '../../store/navbar/types'
import { AllEvents } from '../../store/store'
import { Dispatch } from '../../store/types'
import { Divider } from '../divider/Divider'
import { BackButton } from '../related-foods/BackButton'
import { EditorMode } from '../standard-editor/StandardEditor'
import { excludedFoods } from './constants/excludedFoods'
import { assembleSearchableFoods } from './helpers/assembleSearchableFoods'
import { createSearcher } from './helpers/createSearcher'
import { getSearchResults } from './helpers/getSearchResults'
import { processSearchResults } from './helpers/processSearchResults'
import { SearchResults } from './SearchResults'

type props = {
  onSearch: (results: (Recipe | Food)[], text: string) => void
  onFind: (result: Recipe | Food) => void
  placeholder?: string
  editorMode?: EditorMode
  resultsToShow: number
  focus: boolean
  styles?: SerializedStyles | null
}

export const Searchbar: React.FC<props> = ({
  focus,
  onFind,
  onSearch,
  placeholder,
  resultsToShow,
  styles,
}) => {
  const {
    data,
    dispatch,
    navbar,
  }: { data: Data; navbar: NavbarState; dispatch: Dispatch<AllEvents> } =
    useStoreon('data', 'navbar')
  const { recipes } = data.profiles[0]
  const foods = getFoods(data)
  const { addIngredientModalVisibility } = navbar

  const [searchbarValue, setSearchbarValue] = React.useState('')
  const defaultSearchResults: (Recipe | Food)[] = []
  const [searchResults, setSearchResults] = React.useState(defaultSearchResults)

  const searchbarInput = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    // Only focus on the searchbar when the StandardEditor is visible
    if (searchbarInput.current) {
      setSearchbarValue('')
      if (focus) {
        // eslint-disable-next-line no-unused-expressions
        searchbarInput.current?.focus()
      }
    }
  }, [focus, navbar.modalVisibility])

  const searchableFoods = assembleSearchableFoods(foods, recipes, excludedFoods)
  const searcher = createSearcher(searchableFoods)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value
    // This is where we remove dummy foods from the search results
    // For example, searching for cheese should only show cheese
    // Not cheddar cheese, quark cheese, etc.
    const searchResults = processSearchResults(
      getSearchResults(text, searcher),
      resultsToShow
    )
    setSearchbarValue(text)
    setSearchResults(searchResults)
    onSearch(searchResults, text)
  }

  const handleOnFind = (item: Food | Recipe) => {
    onFind(item)
    setSearchbarValue('')
  }

  const x = addIngredientModalVisibility
  const input = css`
    border: none;
    font-weight: 400;
    height: 59px;
    margin-top: ${searchbarValue === '' || x ? '0px' : '15px'};
    padding: 20px;
    padding-left: 10px;
    width: 100%;
  `

  return (
    <div id="Searchbar">
      <div className="fr">
        <input
          type="text"
          autoComplete={'off'}
          autoCorrect={'off'}
          autoCapitalize={'off'}
          ref={searchbarInput}
          value={searchbarValue}
          disabled={false}
          onChange={onChange}
          placeholder={
            placeholder || addIngredientModalVisibility
              ? 'Search for ingredients...'
              : 'Search for foods...'
          }
          css={[input, styles]}
        />
        {addIngredientModalVisibility && (
          <BackButton
            useUnderlineHover={false}
            onClick={() => dispatch('closeAddIngredientModal')}
          />
        )}
      </div>
      {(searchResults.length > 0 || addIngredientModalVisibility) && (
        <Divider />
      )}
      <div
        id="SearchbarSearchResultsContainer"
        className={`w100 ${searchbarValue ? 'visible' : 'invisible'}`}
      >
        <SearchResults
          searchbarValue={searchbarValue}
          results={searchResults}
          onFind={handleOnFind}
        />
      </div>
    </div>
  )
}
