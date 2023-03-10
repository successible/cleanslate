import { convertToNumber } from './convertToNumber'

/**
 * To avoid any GraphQL errors, convert any fraction inputs to numbers and any "" to null
 */
export const prep = (input: string | number): number | null => {
  return convertToNumber(input)
}
