import { css } from '@emotion/react'
import Head from 'next/head'
import React from 'react'
// @ts-ignore
import { DensityItem } from '../components/list/Density/DensityItem'
import { Navbar } from '../components/navbar/Navbar'
import { createSearcher } from '../components/standard-adder/helpers/createSearcher'
import { getSearchResults } from '../components/standard-adder/helpers/getSearchResults'
import { Tabs } from '../components/tabs/Tabs'
import { Group, groups } from '../constants/groups'
import { getBasicFoods } from '../helpers/Food/getBasicFoods'
import { sortByDensity } from '../helpers/sortByDensity'
import { Density, Food } from '../models/food'

const Foods = () => {
  const [searchText, setSearchText] = React.useState('')
  const [searchResults, setSearchResults] = React.useState([] as Food[])
  const [density, updateDensity] = React.useState('caloric-density' as Density)
  const [group, setGroup] = React.useState('All' as Group | 'All')

  const { basicFoods } = getBasicFoods()

  const foodsToUse = basicFoods
    // To avoid confusion, remove the raw or dry dummy foods
    .filter((food) => {
      return (
        food.name.includes('(raw)') === false &&
        food.name.includes('(dry)') === false
      )
    })
    // Omit the cooked from the remaining dummy foods
    .map((food) => {
      food.name = food.name.replace('(cooked)', '')
      return food
    })

  const itemsToRetain = foodsToUse
    .filter((item) => {
      return item.type === 'food' && item.foodToProfile === null
    })
    .filter((item) => group === 'All' || item.group === group)

  const itemsToRender = sortByDensity(
    density,
    searchResults.length > 0 ? searchResults : itemsToRetain
  )

  const searcher = createSearcher(itemsToRetain)
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value
    const searchResults = getSearchResults(text, searcher)
    setSearchText(text)
    setSearchResults(searchResults)
  }

  const tabs = () => {
    return (
      <Tabs
        selected={density}
        onSelect={(tab: string | null) => {
          updateDensity(tab as Density)
        }}
        css={css`
          font-size: 0.9rem !important;
          > button {
            margin-left: 0;
            margin-right: 0;
          }

          > button:nth-of-type(1) {
            margin-right: 10px;
          }

          > button:nth-of-type(2) {
            margin-right: 10px;
          }
        `}
        tabs={{
          'caloric-density': {
            image: '',
            title: 'Caloric density',
          },
          // eslint-disable-next-line sort/object-properties
          'protein-density': {
            image: '',
            title: 'Protein density',
          },
          'combined-density': {
            image: '',
            title: 'Combined density',
          },
        }}
      />
    )
  }

  const allFoods = css`
    margin: 0 auto;
    max-width: 1000px;
    width: 90%;
    padding-bottom: 50px;
  `

  return (
    <>
      <Head>
        <title>Clean Slate | Foods</title>
      </Head>
      <Navbar />
      <div css={allFoods}>
        <h1 className="huge tcenter mb30 mt120">Foods</h1>
        <input
          type="text"
          autoCapitalize={'off'}
          autoComplete={'off'}
          autoCorrect={'off'}
          value={searchText}
          disabled={false}
          onChange={onChange}
          placeholder={'Filter by name...'}
          className={`fr bar list-bar mt20 ${
            searchText !== '' ? 'active' : ''
          }`}
        />
        <select
          value={group}
          onChange={(e) => setGroup((e.target.value as Group) || 'All')}
          className="mt10"
        >
          <option value="All">All groups</option>
          {groups
            .filter((group) => !['Custom'].includes(group))
            .map((group) => (
              <option value={group} key={group}>
                {group}
              </option>
            ))}
        </select>
        <div className="w100 mb30 mt10">{tabs()}</div>
        {itemsToRender.map((food) => (
          <DensityItem key={food.id} food={food as Food} density={density} />
        ))}
      </div>
    </>
  )
}

export default Foods
