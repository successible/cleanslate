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
const { getHasuraClient } = require('../getHasuraClient')
const { assignBarcode } = require('./barcode') as typeof import('./barcode')
const {
  createCleanSlateBarcode,
  isCleanSlateBarcode,
  renderBarcode,
  resolveBarcode,
} = require('./barcode') as typeof import('./barcode')

describe('createCleanSlateBarcode', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test.each([
    [0, 'CS00000000'], // all zeros
    [42, 'CS00000042'], // adds leading zeros
    [99_999_999, 'CS99999999'], // largest eight-digit value
    [100_000_000, 'CS00000000'], // returns to zero
    [123_456_789, 'CS23456789'], // keeps the last eight digits
    [4_294_967_295, 'CS94967295'], // largest Uint32 value
  ])('converts random number %i to %s', (random, expected) => {
    // mock the random number generation so we can get deterministic tests
    const spy = jest
      .spyOn(globalThis.crypto, 'getRandomValues')
      .mockImplementation((array) => {
        ;(array as Uint32Array)[0] = random
        return array
      })

    expect(createCleanSlateBarcode()).toBe(expected)
    expect(spy).toHaveBeenCalledTimes(1)
  })
})

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

describe('assignBarcode', () => {
  const success = { update_foods_by_pk: { id: 'food-id' } }
  const collision =
    'duplicate key value violates unique constraint "foods_customBarcode_key"'

  const request =
    jest.fn<(query: string, variables: unknown) => Promise<unknown>>()

  beforeEach(() => {
    request.mockReset()
    getHasuraClient.mockResolvedValue({ request })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('saves and returns the same code', async () => {
    request.mockResolvedValue(success)

    const code = await assignBarcode('food-id')

    expect(code).toMatch(/^CS\d{8}$/)
    expect(request).toHaveBeenCalledWith(expect.any(String), {
      pk_columns: { id: 'food-id' },
      set: { customBarcode: code },
    })
  })

  test('tries again after a collision', async () => {
    request.mockRejectedValueOnce(collision).mockResolvedValueOnce(success)

    await expect(assignBarcode('food-id')).resolves.toMatch(/^CS\d{8}$/)
    expect(request).toHaveBeenCalledTimes(2)
  })

  test('stops after three collisions', async () => {
    request.mockRejectedValue(collision)

    await expect(assignBarcode('food-id')).rejects.toBe(collision)
    expect(request).toHaveBeenCalledTimes(3)
  })

  test('does not try again after a different error', async () => {
    request.mockRejectedValue('Network error')

    await expect(assignBarcode('food-id')).rejects.toBe('Network error')
    expect(request).toHaveBeenCalledTimes(1)
  })

  test('fails if no food was updated', async () => {
    request.mockResolvedValue({ update_foods_by_pk: null })

    await expect(assignBarcode('food-id')).rejects.toThrow(
      'food was not updated'
    )
    expect(request).toHaveBeenCalledTimes(1)
  })
})
