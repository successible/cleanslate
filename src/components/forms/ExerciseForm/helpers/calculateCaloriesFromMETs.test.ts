import { expect } from '@jest/globals'
import { calculateCaloriesFromMETs } from './calculateCaloriesFromMETs'

test('calculateCaloriesFromMETs works as expected', () => {
  expect(calculateCaloriesFromMETs(200, 60, 3)).toBe(286)
})
