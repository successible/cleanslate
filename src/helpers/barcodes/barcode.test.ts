import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from '@jest/globals'

jest.mock('jsbarcode', () => ({
  __esModule: true,
  default: jest.fn(),
}))
jest.mock('../getHasuraClient', () => ({ getHasuraClient: jest.fn() }))
jest.mock('../stringifyQuery', () => ({ stringifyQuery: (q: string) => q }))

// Use require so that these modules load after jest.mock runs.
const JsBarcode = require('jsbarcode').default
const {
  isCleanSlateBarcode,
  renderBarcode,
  resolveBarcode,
} = require('./barcode') as typeof import('./barcode')

describe('isCleanSlateBarcode', () => {
  test.each([
    ['', false],
    ['cs00000042', false],
    ['CS1234567', false],
    ['CS123456789', false],
    ['CS1234567A', false],
    [' CS00000042', false],
    ['CS00000042 ', false],
  ])('%s should be %s', (barcode, expected) => {
    expect(isCleanSlateBarcode(barcode)).toBe(expected)
  })
})

describe('renderBarcode', () => {
  // The mock does not use the SVG element, so an empty object is sufficient.
  const svg = {} as SVGSVGElement

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('sends the element, value and options to JsBarcode', () => {
    renderBarcode(svg, 'CS00000042')

    expect(JsBarcode).toHaveBeenCalledTimes(1)
    expect(JsBarcode).toHaveBeenCalledWith(svg, 'CS00000042', {
      format: 'CODE128',
      width: 2,
      height: 80,
      margin: 20,
      displayValue: true,
      background: '#ffffff',
      lineColor: '#000000',
    })
  })

  test.each([
    '', // empty
    '00000042', // no prefix
    'cs00000042', // lowercase prefix
    'CS1234567', // too short
    'CS123456789', // too long
    'CS1234567A', // contains a letter
    ' CS00000042', // leading space
    'CS00000042 ', // trailing space
  ])('rejects the invalid value "%s"', (barcode) => {
    expect(() => renderBarcode(svg, barcode)).toThrow(
      `Invalid Clean Slate barcode: ${barcode}`
    )
    expect(JsBarcode).not.toHaveBeenCalled()
  })
})

describe('resolveBarcode', () => {
  // The lookup uses only customBarcode.
  const food = {
    customBarcode: 'CS00000042',
  } as import('../../models/food').Food

  test.each(['CS00000042', ' cs00000042 '])(
    'finds a food for "%s"',
    (input) => {
      expect(resolveBarcode(input, [food])).toEqual({ kind: 'food', food })
    }
  )

  test('reports an unknown Clean Slate barcode', () => {
    expect(resolveBarcode('CS99999999', [food])).toEqual({ kind: 'notFound' })
  })

  test('identifies a product barcode as external', () => {
    expect(resolveBarcode(' 3017620422003 ', [food])).toEqual({
      kind: 'external',
      code: '3017620422003',
    })
  })
})
