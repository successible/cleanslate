import type { Searcher } from './createSearcher'

/** Given a search string, search all foods and recipes and return a subset of those foods */
export const getSearchResults = <X>(text: string, searcher: Searcher<X>) => {
  if (text !== '') {
    return searcher.search(text).map((result) => result.item) as X[]
  }
  return [] as X[]
}
