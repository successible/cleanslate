import { sortByUpdatedAt } from '../../components/list/Log/helpers/sortByUpdatedAt'
import { Food } from '../../models/food'
import { fetchBasicFoodsKey } from '../constants'
import { getHasuraClient } from '../getHasuraClient'
import { getStore } from '../getStore'
import { gql } from '../gql'
import { handleError } from '../handleError'
import { isBrowser } from '../isBrowser'
import { stringifyQuery } from '../stringifyQuery'

export const QUERY_BASIC_FOODS = gql`
  query QUERY_DATA {
    foods(where: { basicFoodId: { _is_null: false } }) {
      ...food
    }
  }
`

/** Fetch new data from the server */
export const fetchAllBasicFoods = async (override = false) => {
  const dispatch = getStore().dispatch
  if (
    isBrowser() &&
    (localStorage.getItem(fetchBasicFoodsKey) !== 'true' || override)
  ) {
    return getHasuraClient().then((client) => {
      client
        .request(stringifyQuery(QUERY_BASIC_FOODS), {})
        .then((data: { foods: Food[] }) => {
          dispatch(
            'updateBasicFoods',
            // We should not sort when data.foods is undefined
            // Instead, we should make sure it is an empty array
            (data.foods ? sortByUpdatedAt(data.foods) : []) as Food[]
          )
          localStorage.setItem(fetchBasicFoodsKey, 'true')
        })
        .catch((error: any) => {
          handleError(error)
        })
    })
  }
}
