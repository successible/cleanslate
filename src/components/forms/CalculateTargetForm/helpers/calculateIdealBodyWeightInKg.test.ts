import { expect } from '@jest/globals'
import { round } from '../../../../helpers/round'
import { calculateIdealBodyWeightInKg } from './calculateIdealBodyWeightInKg'

test('calculateIdealBodyWeightInKg works as expected', () => {
  expect(round(calculateIdealBodyWeightInKg('male', 74), 2)).toBe(78.59)
  expect(round(calculateIdealBodyWeightInKg('female', 74), 2)).toBe(72.8)
  expect(round(calculateIdealBodyWeightInKg('other', 74), 2)).toBe(75.69)
})
