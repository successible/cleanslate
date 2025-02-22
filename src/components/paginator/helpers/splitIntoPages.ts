export const splitIntoPages = <X>(
  array: Array<X>,
  pageSize: number
): Array<X>[] => {
  /** Split an array of many items into a nested array with equal size groups */
  if (array.length <= pageSize) {
    return [array]
  }
  const slice = array.slice(0, pageSize)
  const remainder = array.slice(pageSize)
  return [slice, ...splitIntoPages(remainder, pageSize)]
}
