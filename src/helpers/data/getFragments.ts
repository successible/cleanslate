import { FOOD_FRAGMENT } from '../../models/Food/schema'
import { INGREDIENT_FRAGMENT } from '../../models/Ingredient/schema'
import { LOG_FRAGMENT } from '../../models/Log/schema'
import { PROFILE_FRAGMENT } from '../../models/Profile/schema'
import { RECIPE_FRAGMENT } from '../../models/Recipes/schema'
import {
  INGREDIENT_BASE_FRAGMENT,
  RECIPE_BASE_FRAGMENT,
} from '../../models/Recipes/schemaShared'

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
