import React from 'react'
import { debounce } from 'throttle-debounce'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import { Type } from '../../../store/data/types'
import { splitIntoPages } from '../../paginator/helpers/splitIntoPages'
import { Paginator } from '../../paginator/Paginator'
import { createSearcher } from '../../standard-adder/helpers/createSearcher'
import { getSearchResults } from '../../standard-adder/helpers/getSearchResults'
import { getItem } from './helpers/getItem'
import { getNumberOfItems } from './helpers/getNumberOfItems'
import { PaginatedListPurpose } from './types'

export type Item = { id: string; type: Type }
type props = {
  paginate: boolean
  items: Item[]
  searchable: boolean
  updateItem: null | ((item: any) => void)
  deleteItem: null | ((id: string) => void)
  purpose: PaginatedListPurpose
  forcedNumberOfItems?: number
  renderItem?: (item: Item) => EmotionJSX.Element
}

export const List: React.FC<props> = ({
  deleteItem,
  forcedNumberOfItems,
  items,
  paginate,
  purpose,
  renderItem,
  searchable,
  updateItem,
}) => {
  // The initial state
  const [activePage, updateActivePage] = React.useState(0)
  const [searchText, setSearchText] = React.useState('')
  const [searchResults, setSearchResults] = React.useState([] as Item[])
  const [numbersOfItems, setNumberOfItems] = React.useState(
    forcedNumberOfItems || 4
  )
  const [referenceItemLength, updateReferenceItemLength] = React.useState(
    items.length
  )

  // Other, initial variables
  const searcher = createSearcher(items)
  const itemContainer = React.useRef<HTMLDivElement>(null)
  const firstItem = React.useRef<HTMLDivElement>(null)

  const getNumberOfItemsFromPage = debounce(100, () => {
    const numberOfItems = getNumberOfItems(itemContainer, firstItem)
    if (numberOfItems) {
      setNumberOfItems(numberOfItems)
    }
  })
  // This function sets the number of items per page
  // Only use forcedNumberOfItems on /foods where the page container can change unreliably
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const adjustNumberOfItems = forcedNumberOfItems
    ? () => setNumberOfItems(forcedNumberOfItems)
    : getNumberOfItemsFromPage

  // This code ensures it runs on every resize event
  React.useEffect(() => {
    adjustNumberOfItems()
    // Adjust the page size on every resize event
    window.addEventListener('resize', adjustNumberOfItems)
    return () => {
      window.removeEventListener('resize', adjustNumberOfItems)
    }
  }, [adjustNumberOfItems])
  // This code ensures in runs when the number of items changes
  if (referenceItemLength !== items.length) {
    updateActivePage(0)
    updateReferenceItemLength(items.length)
  }

  // If paginate is false, put all the items into one nested arrays
  // Otherwise, the nested array should have multiple entries, each corresponding to a different page
  const itemsToUse =
    paginate === false
      ? [items]
      : splitIntoPages(
          searchable && searchText !== '' ? searchResults : items,
          numbersOfItems
        )

  return (
    <div id={`${purpose}`} className="w100 h100 fcs expand">
      {/* The fuzzy search input */}
      {searchable && (
        <input
          type="text"
          autoCapitalize={'off'}
          autoComplete={'off'}
          autoCorrect={'off'}
          value={searchText}
          disabled={false}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const text = event.target.value
            const searchResults = getSearchResults(text, searcher).slice(0, 4)
            setSearchText(text)
            setSearchResults(searchResults)
            updateActivePage(0)
          }}
          placeholder={'Filter by name...'}
          className="fr bar list-bar mb30"
        />
      )}
      <div ref={itemContainer} className="w100">
        {referenceItemLength === items.length &&
          itemsToUse[activePage].map((item, index) => (
            <div
              className="w100"
              ref={index === 0 ? firstItem : null}
              key={item.id}
            >
              {renderItem
                ? // Used only for /foods and DensityItem so we can pass density in
                  renderItem(item)
                : getItem(item, updateItem, deleteItem, purpose)}
            </div>
          ))}
      </div>

      {paginate && (
        <Paginator
          activePage={activePage}
          items={itemsToUse}
          handleClick={(number: number) => {
            updateActivePage(number)
          }}
        />
      )}
    </div>
  )
}
