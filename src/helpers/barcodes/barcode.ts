import JsBarcode from 'jsbarcode'
import type { Food } from '../../models/food'

const CUSTOM_BARCODE = /^CS\d{8}$/


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
