import { QuickScore } from 'quick-score'

export type Searcher<X> = {
  search: (text: string) => { item: X }[]
}

export const createSearcher = <X>(
  items: X[],
  keys = ['name', 'alias']
): Searcher<X> => new QuickScore(items, { keys })
