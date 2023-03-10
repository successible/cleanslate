import { FOOD_FRAGMENT } from '../graphql/food'
import { INGREDIENT_FRAGMENT } from '../graphql/ingredient'
import { LOG_FRAGMENT } from '../graphql/log'
import { PROFILE_FRAGMENT } from '../graphql/profile'

import {
  INGREDIENT_BASE_FRAGMENT,
  RECIPE_BASE_FRAGMENT,
  RECIPE_FRAGMENT,
} from '../graphql/recipe'

const PROFILE_FRAGMENTS = `${PROFILE_FRAGMENT}`
const RECIPE_FRAGMENTS = `${INGREDIENT_BASE_FRAGMENT} ${INGREDIENT_FRAGMENT} ${RECIPE_BASE_FRAGMENT} ${RECIPE_FRAGMENT}`

export const getFragments = (query: string) => `
${query.includes('...profile') ? PROFILE_FRAGMENTS : ''}
${query.includes('...food') ? FOOD_FRAGMENT : ''}
${query.includes('...log') ? LOG_FRAGMENT : ''}
${
  query.includes('...recipe') || query.includes('...ingredient')
    ? RECIPE_FRAGMENTS
    : ''
}
`
