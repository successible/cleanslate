import { expect } from '@jest/globals'
import { calculateTargets } from './calculateTargets'

test('calculateTargets works for a large man who lifts and wants to lose weight', () => {
  const result = calculateTargets(
    false,
    '29',
    'male',
    '250',
    '6',
    '2',
    true,
    'fat'
  )
  const { calorieTarget, proteinTarget } = result
  expect(calorieTarget).toBe(1959)
  expect(proteinTarget).toBe(134)
})

test('calculateTargets works for a large man who lifts and wants to lose weight, but in metric', () => {
  const result = calculateTargets(
    true,
    '29',
    'male',
    '113.398',
    '187.96',
    '2',
    true,
    'fat'
  )
  const { calorieTarget, proteinTarget } = result
  expect(calorieTarget).toBe(1959)
  expect(proteinTarget).toBe(134)
})

test('calculateTargets works for a large man who lifts and wants to maintain weight', () => {
  const result = calculateTargets(
    false,
    '29',
    'male',
    '250',
    '6',
    '2',
    true,
    'maintain'
  )
  const { calorieTarget, proteinTarget } = result
  expect(calorieTarget).toBe(2613)
  expect(proteinTarget).toBe(134)
})

test('calculateTargets works for a small women who does not lift and wants to lose weight', () => {
  const result = calculateTargets(
    false,
    '45',
    'female',
    '130',
    '5',
    '2',
    false,
    'fat'
  )
  const { calorieTarget, proteinTarget } = result
  expect(calorieTarget).toBe(1144)
  expect(proteinTarget).toBe(63)
})

test('calculateTargets works for a medium other who lifts and wants to gain muscle', () => {
  const result = calculateTargets(
    false,
    '22',
    'other',
    '160',
    '5',
    '6',
    true,
    'muscle'
  )
  const { calorieTarget, proteinTarget } = result
  expect(calorieTarget).toBe(2031)
  expect(proteinTarget).toBe(87)
})
