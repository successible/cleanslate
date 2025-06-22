import { expect } from '@jest/globals'
import { calculateBodyFatPercentageUsingCUN_BAE } from './calculateBodyFatPercentageUsingCUN_BAE'
import { CM_TO_IN, LBS_TO_KG } from './calculateTargets'

test('Does calculateBodyFatPercentageUsingCUN_BAE work as expected?', () => {
  const result = calculateBodyFatPercentageUsingCUN_BAE(
    100 * LBS_TO_KG,
    180 * CM_TO_IN,
    'male',
    30
  )
  expect(result.toFixed(3)).toBe('30.715')
})
