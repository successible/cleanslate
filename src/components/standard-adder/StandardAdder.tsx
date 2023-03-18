import { css } from '@emotion/react'
import get from 'just-safe-get'
import uniqueBy from 'lodash.uniqby'
import React, { useState } from 'react'
import { dummyFoods } from '../../constants/dummyFoods/dummyFoods'
import { pastaNames } from '../../constants/dummyFoods/pasta'
import { Food } from '../../models/food'
import { Profile } from '../../models/profile'
import { Recipe } from '../../models/recipe'
import { colors } from '../../theme'
import { Meta } from './components/Meta'
import { SearchResult } from './components/SearchResults'
import { SelectedItem } from './components/SelectedItem'
import { createDummyFood } from './helpers/createDummyFood'
import { createSearcher } from './helpers/createSearcher'
import { getSearchResults } from './helpers/getSearchResults'
import { mapFoodToDummyFood } from './helpers/mapNameToDummyFood'

export type AdderItem = 'ingredient' | 'log'

type props = {
  profile: Profile
  recipes: Recipe[]
  foods: Food[]
  type: AdderItem
}

export const StandardAdder: React.FC<props> = ({
  foods,
  profile,
  recipes,
  type,
}) => {
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState([] as (Food | Recipe)[])
  const [path, setPath] = useState([] as string[])
  const [options, setOptions] = useState([] as string[])
  const [dummyFood, setDummyFood] = useState(null as Food | Recipe | null)
  const [selectedItem, setSelectedItem] = useState(null as Food | Recipe | null)

  // The searching infrastructure
  const items = [
    ...foods,
    ...recipes,
    // Pasta is special because it is many unique names, like Pastina, mapped to white or wheat pasta
    ...pastaNames.map((name) => createDummyFood(name, 'Grain', 'Pasta')),
  ]
  const searcher = createSearcher(items)

  const clearEverything = () => {
    setSearchText('')
    setSearchResults([])
    setOptions([])
    setPath([])
    setSelectedItem(null)
  }

  // Focus on the searchbar when the editor first loads

  const searchbarInput = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => {
    if (searchbarInput.current) {
      searchbarInput.current?.focus()
    }
  }, [])

  return (
    <div className="w100">
      {/* The searchbar to search for the item */}

      {!selectedItem && path.length === 0 && (
        <input
          type="text"
          value={searchText}
          autoComplete={'off'}
          autoCorrect={'off'}
          autoCapitalize={'off'}
          ref={searchbarInput}
          placeholder={'Search for items...'}
          css={css`
            font-weight: 400;
            height: 59px;
            padding: 20px;
            padding-left: 10px;
            width: 100%;
            border-radius: 0px;
            border: 0px;
            border-bottom: 1px solid #eee;
            &:focus {
              border-color: #eee;
            }
          `}
          onChange={(e) => {
            const value = e.target.value
            setSearchText(value)
            // Reset the results on an empty string
            if (value === '') {
              setSearchResults([])
            } else {
              const results = getSearchResults(value, searcher)

              // If you search chicken, you will get all the leaves
              // For example: [chicken breast without skin (cooked), etc.]
              // This maps them all the single dummy food Chicken

              const resultsWithoutLeaves = results.map((result) =>
                mapFoodToDummyFood(result)
              )

              // Remove all the duplicate dummy foods (e.g. the dummy food chicken like 40 times)
              // Handles the fact a recipe, custom food, and basic food can all be named the same thing

              const uniqueResults = uniqueBy(
                resultsWithoutLeaves,
                (x) => x.name + x.type + x.profile
              )

              setSearchResults(uniqueResults.slice(0, 6))
            }
          }}
        />
      )}

      {/* The results of that search: all foods and recipes and the first of each dummy food */}

      {!selectedItem &&
        searchResults.map((result, i) => {
          return (
            <SearchResult
              result={result}
              onClick={() => {
                if (result.isDummy) {
                  const newPath = [...path, result.name]
                  const options: string[] = Object.keys(
                    get(dummyFoods, newPath)
                  )
                  setPath(newPath)
                  setOptions(options)
                  path.length === 0 && setDummyFood(result)
                } else {
                  setSelectedItem(result)
                }
                setSearchResults([])
                setSearchText('')
              }}
              key={result.name + i}
            />
          )
        })}

      {/* Once a dummy food is selected, iterate through the tree of the dummy food */}

      {!selectedItem && path.length >= 1 && dummyFood && (
        <>
          <div
            css={css`
              padding: 0px 20px;
            `}
          >
            <Meta
              selectedItem={dummyFood}
              isDummy={true}
              onBack={() => clearEverything()}
              showBack={true}
              path={path.map((p) => p.toLowerCase())}
            />
          </div>

          {options.map((option) => {
            return (
              <button
                className="fr w100"
                css={css`
                  color: ${colors.text};
                  font-size: 0.9rem;
                  font-weight: 400;
                  padding: 15px 20px;
                `}
                onClick={() => {
                  const newPath = [...path, option]
                  const options: string[] = get(dummyFoods, newPath)
                  if (Array.isArray(options)) {
                    const food = foods.find((food) => food.name === options[0])
                    food && setSelectedItem(food)
                  } else {
                    setPath(newPath)
                    setOptions(Object.keys(options))
                  }
                }}
                key={option}
              >
                {option}
              </button>
            )
          })}
        </>
      )}

      {/* Once a final item is selected, a food, recipe, or leaf of a dummy food */}

      {selectedItem && (
        <SelectedItem
          profile={profile}
          type={type}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          onBack={() => clearEverything()}
        />
      )}
    </div>
  )
}
