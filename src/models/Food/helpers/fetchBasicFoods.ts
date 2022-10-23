import { sortByUpdatedAt } from '../../../components/list/Log/helpers/sortByUpdatedAt'
import { fetchBasicFoodsKey } from '../../../helpers/data/constants'
import { getHasuraClient } from '../../../helpers/data/getHasuraClient'
import { getStore } from '../../../helpers/data/getStore'
import { gql } from '../../../helpers/data/gql'
import { handleError } from '../../../helpers/data/handleError'
import { isBrowser } from '../../../helpers/data/isBrowser'
import { stringifyQuery } from '../../../helpers/data/stringifyQuery'
import { Food } from '../model'

export const QUERY_BASIC_FOODS = gql`
  query QUERY_DATA {
    foods(where: { profile: { _is_null: true } }) {
      ...food
    }
  }
`

/** Fetch new data from the server */
export const fetchBasicFoods = async (override = false) => {
  const dispatch = getStore().dispatch
  if (
    isBrowser() &&
    (localStorage.getItem(fetchBasicFoodsKey) !== 'true' || override)
  ) {
    return getHasuraClient().then((client) => {
      client
        .request(stringifyQuery(QUERY_BASIC_FOODS), {})
        .then((data: { foods: Food[] }) => {
          dispatch('updateBasicFoods', sortByUpdatedAt(data.foods) as Food[])
          localStorage.setItem(fetchBasicFoodsKey, 'true')
        })
        .catch((error: any) => {
          handleError(error)
        })
    })
  }
}
