import { expect } from '@jest/globals'
import { calculateCaloriesFromMETs } from './calculateCaloriesFromMETs'

test('calculateCaloriesFromMETs works as expected', () => {
  expect(calculateCaloriesFromMETs(200, 60, 3)).toBe(286)
  expect(calculateCaloriesFromMETs(200, 60, 10)).toBe(953)
})
