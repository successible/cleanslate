import { getFragments } from './getFragments'

export const stringifyQuery = (query: string): string => {
  const stringQuery = `${query} 
   ${getFragments()}
  `
  return stringQuery
}
