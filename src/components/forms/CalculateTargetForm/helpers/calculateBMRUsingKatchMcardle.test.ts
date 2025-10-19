import { expect } from '@jest/globals'
import { round } from '../../../../helpers/round'
import { calculateBMRUsingKatchMcardle } from './calculateBMRUsingKatchMcardle'

// Reference: https://www.omnicalculator.com/health/bmr-katch-mcardle

test('calculateBMRUsingKatchMcardle works as expected', () => {
  const result = round(calculateBMRUsingKatchMcardle(200, 0.3), 2)
  expect(result).toBe(1741.66)
})
