import { css } from '@emotion/react'
import React from 'react'
import { capitalize } from '../../helpers/utility/capitalize'
import { Food } from '../../models/Food/model'
import { Recipe } from '../../models/Recipes/model'
import { colors } from '../../theme'
import { getNextLevel } from '../searchbar/helpers/getNextLevel'
import { getStrictSearchResults } from '../searchbar/helpers/getStrictSearchResults'
import { isSearchableDummyFood } from '../searchbar/helpers/isSearchableDummyFood'
import { formatName } from '../standard-editor/helpers/formatName'
import { setNextLevelOrFindFood } from '../standard-editor/helpers/setNextLevelOrFindFood'
import { BackButton } from './BackButton'
import { createHeaderDictionary } from './helpers/createHeaderDictionary'

type props = {
  foods: Food[]
  onSuccess: (food: Food) => void
  dummyFood: Food | Recipe
  searchText: string
}

const breadcrumb = css`
  color: ${colors.darkgrey};
  font-size: 0.9rem;
  padding: 0;
  > div {
    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
  &:hover,
  &:focus {
    background-color: white;
    div {
      text-decoration: underline;
    }
  }
`

export const List: React.FC<props> = ({
  dummyFood,
  foods,
  onSuccess,
  searchText,
}) => {
  const [keys, updateKeys] = React.useState([dummyFood.name])
  React.useEffect(() => {
    updateKeys([dummyFood.name])
  }, [dummyFood])

  const buttonRef = React.useRef(null) as React.RefObject<HTMLButtonElement>
  React.useEffect(() => {
    buttonRef.current?.focus()
  }, [])

  // If the key is "Chicken", the next level should be ["Breast", "Thigh", "Wing"]
  // Essentially, list is just a dumb function that renders the next level from something like "Chicken"
  // Based on the key, which is mutated
  const nextLevel = getNextLevel(keys)
  const nextLevelLimitedBySearch = getStrictSearchResults(
    searchText,
    nextLevel
  ).sort((a, b) => a.localeCompare(b))

  const headerDictionary = createHeaderDictionary(nextLevel)
  return (
    <div className="fc">
      <div className="w100 fr mb15">
        {keys.length !== 1 &&
          keys.map((key, index) => (
            <button
              onClick={() => {
                index === 0
                  ? updateKeys([dummyFood.name])
                  : updateKeys(keys.slice(0, (keys.length - index) * -1))
              }}
              type="button"
              css={breadcrumb}
              key={key}
            >
              {index !== 0 && index !== 1 && <span className="ml5">&gt;</span>}
              {/* Only show everything after the first. Breast > Cooked not Chicken > Breast > Cooked */}
              <div className="ml5">
                {index === 0
                  ? ''
                  : index === 1
                  ? capitalize(key)
                  : key.toLowerCase()}
              </div>
            </button>
          ))}
        {/* For now, don't include the back button as it is distracting */}
        {JSON.stringify(keys) !== JSON.stringify([dummyFood.name]) && (
          <BackButton
            useUnderlineHover={true}
            onClick={() => {
              // Go back one level
              updateKeys(keys.slice(0, -1))
            }}
          />
        )}
      </div>

      {(isSearchableDummyFood(dummyFood)
        ? nextLevelLimitedBySearch
        : nextLevel
      ).map((name, index) => {
        // Code relating to setting the header for searching dummy foods
        // Looks like Contacts on iOS
        const firstLetter = name.slice(0, 1)
        const showHeader =
          isSearchableDummyFood(dummyFood) &&
          headerDictionary[firstLetter] === index &&
          searchText === '' &&
          nextLevel.length >= 4
        // Only show the header if the item is the first item of that letter, such as Blue of Blue Cheese
        // The dummy food is searchable, there is not text in the searchbar currently
        // And there is enough foods to make it worth searching (4). For example, it is worth searching all the Whole grains.
        // It is NOT worth searching ["cooked", "dry"], which is the next level of grains
        const header = showHeader && (
          <div>
            <span> {firstLetter}</span>
          </div>
        )

        const button = css`
          color: ${colors.text};
          font-size: 0.9rem;
          margin-bottom: 5px;
          position: relative;
        `

        return (
          <div className="w100" key={index}>
            {header}
            <button
              // Only focus on the first related food button!
              ref={index === 0 ? buttonRef : null}
              type="button"
              css={button}
              className={`fr w100`}
              onClick={() =>
                setNextLevelOrFindFood(name, keys, updateKeys, foods, onSuccess)
              }
            >
              <div className="normal">{formatName(name, keys)}</div>
            </button>
          </div>
        )
      })}
    </div>
  )
}
