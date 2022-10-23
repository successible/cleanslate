/* eslint-disable @typescript-eslint/no-explicit-any */
/** Zips two lists into one object.
 *
 * For example: zipObject(['a', 'b'], [1, 2]) => { 'a': 1, 'b': 2 } */
export const zipObject = (L1: Array<any>, L2: Array<any>): Record<any, any> => {
  return L1.reduce((acc, item, index) => {
    acc[item] = L2[index]
    return acc
  }, {})
}
