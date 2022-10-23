import { convertFractionToDecimal } from '../../components/standard-editor/helpers/convertFractionToDecimal'
import { convertToNumber } from './convertToNumber'

/**
 * To avoid any GraphQL errors, convert any fraction inputs to numbers and any "" to null
 */
export const prep = (input: React.ReactText): number | null => {
  return convertToNumber(convertFractionToDecimal(input))
}
