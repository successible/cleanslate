import JsBarcode from 'jsbarcode'
import { UPDATE_FOOD } from '../../graphql/food'
import type { Food } from '../../models/food'
import { getHasuraClient } from '../getHasuraClient'
import { stringifyQuery } from '../stringifyQuery'

const PREFIX = 'CS'
const CUSTOM_BARCODE = /^CS\d{8}$/

/**
 * Creates a barcode for Clean Slate in
 * the format of CS23456789
 *
 * @returns Clean Slate custom barcode
 */
export const createCleanSlateBarcode = (): string => {
  const [random] = crypto.getRandomValues(new Uint32Array(1))
  const digits = String(random % 100_000_000).padStart(8, '0')
  return `${PREFIX}${digits}`
}

/**
 * Check if a barcode is custom to Clean Slate.
 *
 * @param barcode
 * @returns true if the barcode is a Clean Slate custom barcode, false otherwise
 */
export const isCleanSlateBarcode = (barcode: string): boolean =>
  CUSTOM_BARCODE.test(barcode)

/**
 *
 * @param svg
 * @param barcode
 */
export const renderBarcode = (
  svg: SVGSVGElement | HTMLCanvasElement,
  barcode: string,
  size: { width?: number; height?: number; margin?: number } = {}
): void => {
  if (!isCleanSlateBarcode(barcode)) {
    throw new Error(`Invalid Clean Slate barcode: ${barcode}`)
  }

  JsBarcode(svg, barcode, {
    format: 'CODE128',
    width: 2,
    height: 80,
    margin: 20,
    displayValue: true,
    background: '#ffffff', // keeps contrast in dark mode
    lineColor: '#000000',
    ...size,
  })
}

/**
 * Sets the Barcode for the food item.
 *
 * @param foodId
 * @returns
 */
export const assignBarcode = async (foodId: string): Promise<string> => {
  const client = await getHasuraClient()

  for (let attempt = 1; ; attempt++) {
    const code = createCleanSlateBarcode()
    try {
      const result = (await client.request(stringifyQuery(UPDATE_FOOD), {
        pk_columns: { id: foodId },
        set: { customBarcode: code },
      })) as { update_foods_by_pk: { id: string } | null }

      if (!result.update_foods_by_pk) {
        throw new Error('The food was not updated')
      }
      return code
    } catch (error) {
      // Try again only if another food has this code.
      const isCollision = String(error).includes('foods_customBarcode_key')
      if (!isCollision || attempt === 3) throw error
    }
  }
}

/**
 * Finds a food if it matches the barcode.
 *
 * @param barcode
 * @param foods
 * @returns
 */
export const resolveBarcode = (barcode: string, foods: Food[]) => {
  const code = barcode.trim().toUpperCase()

  if (!isCleanSlateBarcode(code)) {
    return { kind: 'external', code } as const
  }

  const food = foods.find((f) => f.customBarcode === code)
  return food
    ? ({ kind: 'food', food } as const)
    : ({ kind: 'notFound' } as const)
}
